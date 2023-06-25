import {UserJourneyGraph} from "../types";

export function createStateChart(userJourneyGraph: UserJourneyGraph): string {
    const states = [...userJourneyGraph.nodes.values()].reduce((stateMap, screen) => {
        return {
            ...stateMap,
            [screen.name]: {
                on: [...userJourneyGraph.edges.values()].filter((task) => task.sourceScreen === screen.id).reduce((taskMap, task) => {
                    return {
                        ...taskMap,
                        [task.name]: {
                            target: userJourneyGraph.nodes.get(task.targetScreen)?.name
                        }
                    }
                }, {}),
            }
        }
    }, {})
    const initialScreen = [...userJourneyGraph.nodes.values()].find((screen) => screen.isInitialScreen)
    const stateMachine = {
        id: "User Journey Map",
        initial: initialScreen?.name,
        states,
        predictableActionArguments: true,
        preserveActionOrder: true
    }
    return JSON.stringify(stateMachine)
}