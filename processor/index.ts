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
  console.log('--- ALL JOURNEYS ---')
  // console.log(createMermaidFlowChart(nodesAndEdges))
  console.log(await createD2FlowChart(nodesAndEdges))
  // console.log(createCSVFile(createLucidChartCSVRows(nodesAndEdges)))
  console.log('--- SINGLE JOURNEY ---')
  // console.log(createMermaidFlowChart(nodesAndEdges, 'existing-customer-buys-chocolates'))
  // console.log(createD2FlowChart(nodesAndEdges, 'existing-customer-buys-chocolates'))
}

processJourneys()