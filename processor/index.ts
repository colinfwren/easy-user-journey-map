import path from 'path'
import { promises as fs } from 'fs'
import remarkParse from 'remark-parse'
import { read } from 'to-vfile'
import { unified } from 'unified'
import type {Root} from "mdast";
import { createMermaidFlowChart } from "./formatters/mermaid";
import { extractJourneyDetails } from "./processors/markdown";
import { getNodesAndEdges } from "./processors/graph";
import { createCSVFile, createLucidChartCSVRows } from "./formatters/lucidChart";
import {createD2FlowChart} from "./formatters/d2";
import {createStateChart} from "./formatters/stateChart";


async function processJourneys() {
    // try {
  const cwd = path.resolve()
  const fullPath = path.join(cwd, '../journeys')
  const files = await fs.readdir(fullPath)
  const userJourneys = await Promise.all(files.filter((file) => file !== 'screenshots').map(async (file) => {
    const filePath = path.join(fullPath, file)
    const tree = await unified().use(remarkParse).parse(await read(filePath))
    return extractJourneyDetails(tree as Root)
  }))
  const nodesAndEdges = getNodesAndEdges(userJourneys)
  // console.log('--- ALL JOURNEYS ---')
  console.log('---- MERMAID (paste into mermaid.live) ----')
  console.log(await createMermaidFlowChart(nodesAndEdges))
  console.log('----- D2 (paste into play.d2lang.com) -----')
  console.log(await createD2FlowChart(nodesAndEdges))
  console.log('------ Lucid Chart (paste into plain text file and save with .csv extension, then import into Lucid Chart) -----')
  console.log(createCSVFile(createLucidChartCSVRows(nodesAndEdges)))
  // console.log(createStateChart(nodesAndEdges))
  // console.log('--- SINGLE JOURNEY ---')
  // console.log(createMermaidFlowChart(nodesAndEdges, 'existing-customer-buys-chocolates'))
  // console.log(createD2FlowChart(nodesAndEdges, 'existing-customer-buys-chocolates'))
}

processJourneys()
