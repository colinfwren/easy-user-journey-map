export type UserJourney = {
  id: string
  name: string
  screens: Screen[]
}

export type Screen = {
  id: string
  name: string
  tasks: Task[]
  image?: string
}

export type Task = {
  id: string,
  name: string,
  image?: string,
  sourceScreen: string,
  targetScreen: string,
}

export type ScreenNode = Omit<Screen, 'tasks'> & {
  userJourneys: string[]
}

export type TaskEdge = Task & {
  userJourneys: string[]
}

export type UserJourneyGraph = {
  nodes: Map<string, ScreenNode>,
  edges: Map<string, TaskEdge>
}

export type LucidChartCsvRow = {
  Id: number,
  Name: string,
  'Shape Library'?: string,
  'Page ID'?: number,
  'Contained By'?: number,
  Group?: number,
  'Line Source'?: number,
  'Line Destination'?: number,
  'Source Arrow'?: string,
  'Destination Arrow'?: string,
  Status?: string,
  'Text Area 1'?: string,
  Comments?: string,
  'User Journeys'?: string
}