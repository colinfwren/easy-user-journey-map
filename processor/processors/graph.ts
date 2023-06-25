import {ScreenNode, TaskEdge, UserJourney, UserJourneyGraph} from "../types";

export function getNodesAndEdges(userJourneys: UserJourney[]): UserJourneyGraph {
  const screenMap = new Map<string, ScreenNode>()
  const taskMap = new Map<string, TaskEdge>()

  userJourneys.map((userJourney) => {
    userJourney.screens.map((screen) => {
      const existingScreen = screenMap.get(screen.id)
      if (existingScreen) {
        screenMap.set(existingScreen.id, {
          ...existingScreen,
          isInitialScreen: existingScreen.isInitialScreen || screen.isInitialScreen,
          isGoalScreen: existingScreen.isGoalScreen || screen.isGoalScreen,
          userJourneys: [
              ...existingScreen.userJourneys,
            userJourney.id
          ]
        })
      } else {
        screenMap.set(screen.id, { ...screen, userJourneys: [userJourney.id] })
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

export function getEdgesForUserJourney(taskMap: Map<string, TaskEdge>, userJourneyId?: string): TaskEdge[] {
  if (userJourneyId) {
    return [...taskMap.values()].filter((task) => task.userJourneys.includes(userJourneyId))
  }
  return [...taskMap.values()]
}