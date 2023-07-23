import {UserJourneyGraph} from "../types";

export function createReactflowOutput(userJourneyGraph: UserJourneyGraph): string {
   const nodes = [...userJourneyGraph.nodes.values()].map((screen) => {
      return {
        id: screen.id,
        data: {
          label: screen.name,
        },
        position: { x: 0, y: 0 }
      }
    })
  const edges = [...userJourneyGraph.edges.values()].map((edge) => {
    return {
      id: edge.id,
      source: edge.sourceScreen,
      target: edge.targetScreen,
      type: 'step',
      label: edge.name
    }
  })
  return JSON.stringify({
    nodes,
    edges
  })
}