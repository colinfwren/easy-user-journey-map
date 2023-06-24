import {UserJourneyGraph, ScreenNode, TaskEdge} from "../types";
import path from "path";
import {promises as fs} from "fs";

function setImage(item: ScreenNode|TaskEdge, filenames: string[]): [string, ScreenNode|TaskEdge] {
  const imageFilename = filenames.find((filename) => filename.split('.')[0] === item.id)
  if (imageFilename) {
    return [item.id, { ...item, image: imageFilename }]
  }
  return [item.id, item]
}

export async function processScreenshots(userJourneyGraph: UserJourneyGraph): Promise<UserJourneyGraph> {
  const cwd = path.resolve()
  const fullPath = path.join(cwd, '../journeys/screenshots')
  const files = await fs.readdir(fullPath)

  if (files.length < 1) {
    return userJourneyGraph
  }

  const filenames = files.map((file) => file.toLowerCase())
  return {
    nodes: new Map<string, ScreenNode>([...userJourneyGraph.nodes.values()].map((node) => setImage(node, filenames))),
    edges: new Map<string, TaskEdge>([...userJourneyGraph.edges.values()].map((edge) => setImage(edge, filenames) as [string, TaskEdge]))
  }
}