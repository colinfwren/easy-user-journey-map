import { parseFilesToUserJourneyGraph } from "../processors/common";
import { createD2FlowChart } from "../formatters/d2";

export async function d2() {
  const userJourneyGraph = await parseFilesToUserJourneyGraph()
  const output = await createD2FlowChart(userJourneyGraph)
  console.log(output)
}