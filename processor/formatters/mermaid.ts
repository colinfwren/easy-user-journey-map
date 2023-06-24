import { UserJourneyGraph } from "../types";
import { getEdgesForUserJourney } from "../processors/graph";

export function createMermaidFlowChart(userJourneyGraph: UserJourneyGraph, userJourneyId?: string): string {
  const connections = getEdgesForUserJourney(userJourneyGraph.edges, userJourneyId).map((task) => {
    const sourceNode = userJourneyGraph.nodes.get(task.sourceScreen)
    const targetNode = userJourneyGraph.nodes.get(task.targetScreen)
    if (sourceNode && targetNode) {
      return `${sourceNode.id}["${sourceNode.name}"] -- "${task.name}" --> ${targetNode.id}["${targetNode.name}"]`
    }
  }).join('\n')
  return '%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%\nflowchart LR\n'+ connections
}