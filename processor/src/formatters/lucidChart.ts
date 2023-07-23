import {LucidChartCsvRow, UserJourneyGraph} from "../types";

const lucidChartDocRow: LucidChartCsvRow = {
  Id: 1,
  Name: 'Document',
  Status: 'Draft',
  'Text Area 1': 'Easy User Journey Map Test'
}

const lucidChartPageRow: LucidChartCsvRow = {
  Id: 2,
  Name: 'Page',
  'Text Area 1': 'Page 1'
}

export function createLucidChartCSVRows(userJourneyGraph: UserJourneyGraph): LucidChartCsvRow[] {
  let rowCount = 2
  const screenIdMap = new Map<string, number>()
  const screens = [...userJourneyGraph.nodes.values()].map((screen) => {
    rowCount++
    screenIdMap.set(screen.id, rowCount)
    return {
      Id: rowCount,
      Name: 'Text',
      'Shape Library': 'Standard',
      'Page ID': lucidChartPageRow.Id,
      'Text Area 1': screen.name,
      'User Journeys': screen.userJourneys.join(',')
    }
  })
  const lines = [...userJourneyGraph.edges.values()].map((task) => {
    rowCount++
    return {
      Id: rowCount,
      Name: 'Line',
      'Page ID': lucidChartPageRow.Id,
      'Line Source': screenIdMap.get(task.sourceScreen),
      'Line Destination': screenIdMap.get(task.targetScreen),
      'Source Arrow': 'None',
      'Destination Arrow': 'Arrow',
      'Text Area 1': task.name,
      'User Journeys': task.userJourneys.join(',')
    }
  })
  return [
      lucidChartDocRow,
      lucidChartPageRow,
      ...screens,
      ...lines
  ]
}

export function createCSVFile(rows: LucidChartCsvRow[]): string {
  const headerCols = ['Id', 'Name', 'Shape Library', 'Page ID', 'Contained By', 'Group', 'Line Source', 'Line Destination', 'Source Arrow', 'Destination Arrow', 'Status', 'Text Area 1', 'Comments', 'User Journeys']
  return [
      headerCols.join(','),
      ...rows.map(row => headerCols.map(col => JSON.stringify(row[col as keyof LucidChartCsvRow], (key, value) => value === null ? '' : value)).join(','))
  ].join('\r\n')
}