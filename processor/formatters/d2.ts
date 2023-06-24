import { UserJourneyGraph } from "../types";
import { getEdgesForUserJourney } from "../processors/graph";
import {processScreenshots} from "../processors/screenshots";

const IMAGE_PREFIX = 'journeys/screenshots'

export async function createD2FlowChart(userJourneyGraph: UserJourneyGraph, userJourneyId?: string): Promise<string> {
  const userJourneyGraphWithImages = await processScreenshots(userJourneyGraph)
  const nodes = [...userJourneyGraphWithImages.nodes.values()].map((node) => {
    if (node.image) {
      return `${node.id}: {
  shape: image
  icon: ${IMAGE_PREFIX}/${node.image}
}`
    }
    return `${node.id}: ${node.name}`
  }).join('\n')

  const connections = getEdgesForUserJourney(userJourneyGraphWithImages.edges, userJourneyId).map((task) => {
    const sourceNode = userJourneyGraph.nodes.get(task.sourceScreen)
    const targetNode = userJourneyGraph.nodes.get(task.targetScreen)
    if (sourceNode && targetNode) {
      return `${sourceNode.id} --> ${targetNode.id}: ${task.name}`
    }
  }).join('\n')
  return `direction: right
${nodes}
  
${connections}
`
}