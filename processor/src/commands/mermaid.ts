import { parseFilesToUserJourneyGraph } from "../processors/common";
import { createMermaidFlowChart } from "../formatters/mermaid";

export async function mermaid() {
  const userJourneyGraph = await parseFilesToUserJourneyGraph()
  const output = await createMermaidFlowChart(userJourneyGraph)
  console.log(output)
}