import {UserJourneyGraph, TaskEdge, XstateTransitionMap} from "../types";

function resolveDupeTasksWithDifferentTargets(taskList: TaskEdge[], task: TaskEdge): TaskEdge[] {
    if (taskList.map(x => x.name).includes(task.name)) {
        const dupeTaskCount = taskList.filter(x => x.name.startsWith(task.name))
        return [
            ...taskList,
            {
                ...task,
                name: `${task.name} ${dupeTaskCount.length}`
            }
        ]
    }
    return [
        ...taskList,
        task
    ]
}

export function createStateChart(userJourneyGraph: UserJourneyGraph): string {
    const states = [...userJourneyGraph.nodes.values()].reduce((stateMap, screen) => {
        const tasks = [...userJourneyGraph.edges.values()]
        .filter((task) => task.sourceScreen === screen.id)
        .reduce(resolveDupeTasksWithDifferentTargets, [])
        if (tasks.length === 0) {
            return {
                ...stateMap,
                [screen.name]: {}
            }
        }


        function getTaskMap(taskMap: XstateTransitionMap, task: TaskEdge): XstateTransitionMap {
            const target = userJourneyGraph.nodes.get(task.targetScreen)?.name
            if (!target) return taskMap
            if (task.sourceScreen === task.targetScreen) {
                return {
                    ...taskMap,
                    [task.name]: {
                        target,
                        internal: false
                    }
                }
            }
            return {
                ...taskMap,
                [task.name]: {
                    target
                }
            }
        }

        return {
            ...stateMap,
            [screen.name]: {
                on: tasks.reduce(getTaskMap, {}),
            }
        }
    }, {})
    const initialScreen = [...userJourneyGraph.nodes.values()].find((screen) => screen.isInitialScreen)
    const stateMachine = {
        id: "User Flow Map",
        initial: initialScreen?.name,
        states,
        predictableActionArguments: true,
        preserveActionOrder: true
    }
    return JSON.stringify(stateMachine)
}