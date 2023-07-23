import { parseFilesToUserJourneyGraph } from "../processors/common";
import { createStateChart } from "../formatters/stateChart";

export async function statechart() {
  const userJourneyGraph = await parseFilesToUserJourneyGraph()
  console.log(createStateChart(userJourneyGraph))
}