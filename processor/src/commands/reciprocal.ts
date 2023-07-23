import { parseFilesToUserJourneyGraph } from "../processors/common";
import { createReactflowOutput } from "../formatters/reactflow";

export async function reciprocal() {
  const userJourneyGraph = await parseFilesToUserJourneyGraph()
  console.log(createReactflowOutput(userJourneyGraph))
}