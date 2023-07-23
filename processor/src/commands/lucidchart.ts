import { parseFilesToUserJourneyGraph } from "../processors/common";
import { createLucidChartCSVRows, createCSVFile } from "../formatters/lucidChart";

export async function lucidchart() {
  const userJourneyGraph = await parseFilesToUserJourneyGraph()
  console.log(createCSVFile(createLucidChartCSVRows(userJourneyGraph)))
}