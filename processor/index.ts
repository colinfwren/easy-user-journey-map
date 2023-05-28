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

type LucidChartCsvRow = {
  Id: number,
  Name: string,
  'Shape Library'?: string,
  'Page ID'?: number,
  'Contained By'?: number,
  Group?: number,
  'Line Source'?: number,
  'Line Destination'?: number,
  'Source Arrow'?: string,
  'Destination Arrow'?: string,
  Status?: string,
  'Text Area 1'?: string,
  Comments?: string,
  'User Journeys'?: string
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

function getEdgesForUserJourney(taskMap: Map<string, TaskEdge>, userJourneyId?: string): TaskEdge[] {
  if (userJourneyId) {
    return [...taskMap.values()].filter((task) => task.userJourneys.includes(userJourneyId))
  }
  return [...taskMap.values()]
}

function createMermaidFlowChart(userJourneyGraph: UserJourneyGraph, userJourneyId?: string): string {
  const connections = getEdgesForUserJourney(userJourneyGraph.edges, userJourneyId).map((task) => {
    const sourceNode = userJourneyGraph.nodes.get(task.sourceScreen)
    const targetNode = userJourneyGraph.nodes.get(task.targetScreen)
    if (sourceNode && targetNode) {
      return `${sourceNode.id}["${sourceNode.name}"] -- "${task.name}" --> ${targetNode.id}["${targetNode.name}"]`
    }
  }).join('\n')
  return 'flowchart LR\n'+ connections
}

const lucidChartDocRow: LucidChartCsvRow = {
  Id: 1,
  Name: 'Document',
  Status: 'Draft',
  'Text Area 1': 'Easy User Journey Map Test'
}

const lucidChartPageRow: LucidChartCsvRow = {
  Id: 2,
  Name: 'Page',
  'Text Area 1': 'Page 1'
}

function createLucidChartCSVRows(userJourneyGraph: UserJourneyGraph): LucidChartCsvRow[] {
  let rowCount = 2
  const screenIdMap = new Map<string, number>
  const screens = [...userJourneyGraph.nodes.values()].map((screen) => {
    rowCount++
    screenIdMap.set(screen.id, rowCount)
    return {
      Id: rowCount,
      Name: 'Text',
      'Shape Library': 'Standard',
      'Page ID': lucidChartPageRow.Id,
      'Text Area 1': screen.name,
      'User Journeys': screen.userJourneys.join(',')
    }
  })
  const lines = [...userJourneyGraph.edges.values()].map((task) => {
    rowCount++
    return {
      Id: rowCount,
      Name: 'Line',
      'Page ID': lucidChartPageRow.Id,
      'Line Source': screenIdMap.get(task.sourceScreen),
      'Line Destination': screenIdMap.get(task.targetScreen),
      'Source Arrow': 'None',
      'Destination Arrow': 'Arrow',
      'Text Area 1': task.name,
      'User Journeys': task.userJourneys.join(',')
    }
  })
  return [
      lucidChartDocRow,
      lucidChartPageRow,
      ...screens,
      ...lines
  ]
}

function createCSVFile(rows: LucidChartCsvRow[]): string {
  const headerCols = ['Id', 'Name', 'Shape Library', 'Page ID', 'Contained By', 'Group', 'Line Source', 'Line Destination', 'Source Arrow', 'Destination Arrow', 'Status', 'Text Area 1', 'Comments', 'User Journeys']
  return [
      headerCols.join(','),
      ...rows.map(row => headerCols.map(col => JSON.stringify(row[col as keyof LucidChartCsvRow], (key, value) => value === null ? '' : value)).join(','))
  ].join('\r\n')
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
  // console.log('--- ALL JOURNEYS ---')
  console.log(createMermaidFlowChart(nodesAndEdges))
  // console.log('--- SINGLE JOURNEY ---')
  // console.log(createMermaidFlowChart(nodesAndEdges, 'existing-customer-buys-chocolates'))
  // console.log(createCSVFile(createLucidChartCSVRows(nodesAndEdges)))
}

processJourneys()