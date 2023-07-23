import path from "path";
import {promises as fs} from "fs";
import {unified} from "unified";
import remarkParse from "remark-parse";
import {read} from "to-vfile";
import {extractJourneyDetails} from "./markdown";
import {Root} from "mdast";
import {getNodesAndEdges} from "./graph";
import {UserJourneyGraph} from "../types";

export async function parseFilesToUserJourneyGraph(): Promise<UserJourneyGraph> {
  const cwd = path.resolve()
  const fullPath = path.join(cwd, '../journeys')
  const files = await fs.readdir(fullPath)
  const userJourneys = await Promise.all(files.filter((file) => !['screenshots', '.DS_Store'].includes(file)).map(async (file) => {
    const filePath = path.join(fullPath, file)
    const tree = await unified().use(remarkParse).parse(await read(filePath))
    return extractJourneyDetails(tree as Root)
  }))
  return getNodesAndEdges(userJourneys)
}