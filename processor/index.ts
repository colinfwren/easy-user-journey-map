import path from 'path'
import { promises as fs } from 'fs'
import remarkParse from 'remark-parse'
import { read } from 'to-vfile'
import { unified } from 'unified'
import type {Heading, List, ListContent, Paragraph, Root, Text} from "mdast";
import slugify from "slugify";

type UserJourney = {
  id: string
  name: string
  screens: Screen[]
}

type Screen = {
  id: string
  name: string
  tasks: Task[]
}

type Task = {
  id: string,
  name: string,
  sourceScreen: string,
  targetScreen: string,
}

type ScreenNode = Omit<Screen, 'tasks'> & {
  userJourneys: string[]
}

type TaskEdge = Task & {
  userJourneys: string[]
}

type UserJourneyGraph = {
  nodes: Map<string, ScreenNode>,
  edges: Map<string, TaskEdge>
}


function getHeadingText(tree: Root): string {
  const headingNode = tree.children.find((node) => node.type === 'heading') as Heading
  const name = headingNode.children.find((node) => node.type === 'text') as Text
  return name.value
}

function getListItemText(listNode: ListContent): string {
  const paragraphNode = listNode.children.find((node) => node.type === 'paragraph') as Paragraph
  const nameNode = paragraphNode.children.find((node) => node.type === 'text') as Text
  return nameNode.value
}

function extractJourneyDetails(tree: Root): UserJourney {
  const journeyName = getHeadingText(tree)
  const journeyId = slugify(journeyName.toLowerCase())
  const screens = extractScreens(tree)
  return {
    id: journeyId,
    name: journeyName,
    screens
  }
}



function extractScreens(tree: Root): Screen[] {
  const listNode = tree.children.find((node) => node.type === 'list') as List
  const initialScreenNodes = listNode.children
  return initialScreenNodes.reduce((data: Screen[], screenNode, index, screenNodes) => {
    const screenName = getListItemText(screenNode)
    const screenId = slugify(screenName.toLowerCase())
    const tasks = screenNode.children.find((node) => node.type === 'list') as List
    if (tasks) {
      const nextScreen = index + 1 < screenNodes.length ? screenNodes[index + 1] : screenNodes[screenNodes.length - 1]
      const nextScreenId = slugify(getListItemText(nextScreen).toLowerCase())
      if (tasks.children.length > 1) {
        const intermittentScreens = tasks.children.map((intermittentScreen) => {
          const name = getListItemText(intermittentScreen)
          return {
            id: slugify(name.toLowerCase()),
            name
          }
        })
        const taskScreens = intermittentScreens.slice(0, -1).map((screen, screenIndex, screens) => {
          const nextTask = intermittentScreens[screenIndex + 1]
          if (screenIndex === screens.length - 1) {
            return {
              ...screen,
              id: `post-${screen.id}`,
              tasks: [
                {
                  id: nextTask.id,
                  name: nextTask.name,
                  sourceScreen: `post-${screen.id}`,
                  targetScreen: nextScreenId
                }
              ]
            }
          } else {
            return {
              ...screen,
              id: `post-${screen.id}`,
              tasks: [
                {
                  id: nextTask.id,
                  name: nextTask.name,
                  sourceScreen: `post-${screen.id}`,
                  targetScreen: `post-${screens[screenIndex + 1].id}`
                }
              ]
            }
          }
        })
        return [
          ...data,
          {
            id: screenId,
            name: screenName,
            tasks: [
              {
                ...intermittentScreens[0],
                sourceScreen: screenId,
                targetScreen: taskScreens[0].id
              }
            ]
          },
          ...taskScreens
        ]
      }
      return [
        ...data,
        {
          id: screenId,
          name: screenName,
          tasks: tasks.children.map((taskNode): Task => {
            const taskName = getListItemText(taskNode)
            const taskId = slugify(taskName.toLowerCase())
            return {
              id: taskId,
              name: taskName,
              sourceScreen: screenId,
              targetScreen: nextScreenId
            }
          })
        }
      ]
    }
    return [
      ...data,
      {
        id: screenId,
        name: screenName,
        tasks: []
      }
    ]
  }, [])
}

function getNodesAndEdges(userJourneys: UserJourney[]): UserJourneyGraph {
  const screenMap = new Map<string, ScreenNode>()
  const taskMap = new Map<string, TaskEdge>()

  userJourneys.map((userJourney) => {
    userJourney.screens.map((screen) => {
      const existingScreen = screenMap.get(screen.id)
      if (existingScreen) {
        screenMap.set(existingScreen.id, { ...existingScreen, userJourneys: [...existingScreen.userJourneys, userJourney.id ]})
      } else {
        screenMap.set(screen.id, { id: screen.id, name: screen.name, userJourneys: [userJourney.id] })
      }
      screen.tasks.map((task) => {
        const existingTask = taskMap.get(task.id)
        if(existingTask) {
          taskMap.set(existingTask.id, { ...existingTask, userJourneys: [...existingTask.userJourneys, userJourney.id]})
        } else {
          taskMap.set(task.id, { ...task, userJourneys: [userJourney.id ]})
        }
      })
    })
  })

  return {
    nodes: screenMap,
    edges: taskMap
  }
}

async function processJourneys() {
    // try {
  const cwd = path.resolve()
  const fullPath = path.join(cwd, '../journeys')
  const files = await fs.readdir(fullPath)
  const userJourneys = await Promise.all(files.map(async (file) => {
    const filePath = path.join(fullPath, file)
    const tree = await unified().use(remarkParse).parse(await read(filePath))
    return extractJourneyDetails(tree as Root)
  }))
  const nodesAndEdges = getNodesAndEdges(userJourneys)
}

processJourneys()