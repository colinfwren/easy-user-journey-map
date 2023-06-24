import { UserJourneyGraph } from "../types";
import { getEdgesForUserJourney } from "../processors/graph";
import {processScreenshots} from "../processors/screenshots";

const IMAGE_PREFIX = 'journeys/screenshots'

export async function createMermaidFlowChart(userJourneyGraph: UserJourneyGraph, userJourneyId?: string): Promise<string> {
  const userJourneyGraphWithImages = await processScreenshots(userJourneyGraph)
  const nodes = [...userJourneyGraphWithImages.nodes.values()].map((node) => {
    if (node.image) {
      return `${node.id}(<img src='${IMAGE_PREFIX}/${node.image}' width='37px' height='81px' alt='${node.name}' />\\n${node.name})`
    }
    return `${node.id}([${node.name}])`
  }).join('\n')


  const connections = getEdgesForUserJourney(userJourneyGraph.edges, userJourneyId).map((task) => {
    const sourceNode = userJourneyGraph.nodes.get(task.sourceScreen)
    const targetNode = userJourneyGraph.nodes.get(task.targetScreen)
    if (sourceNode && targetNode) {
      return `${sourceNode.id} --> |${task.name}| ${targetNode.id}`
    }
  }).join('\n')
  return `%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart LR
${nodes}

${connections}
`
}