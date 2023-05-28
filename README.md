# Easy User Journey Mapping
A tool to simplify making user journey maps

## Concepts
- User Journey: A journey a user takes through the product achieve a goal
- Screen: A screen or page on which a user performs and action as part of progressing along the User Journey
- Task: An action the user takes on the screen to progress along the User Journey

## Creating a User Journey
The User Journey is the anchor to this tool. A markdown file is created for each User Journey with in it there must be
a top heading which will form the name of the User Journey and numbered list which will have 2 levels.

The top level of the list will represent the Screens that are visited as part of the User Journey and underneath
that level will be the Tasks the user performs to progress. The last screen in the journey has no nested lists

1. Screen 1
   1. Task 1
   2. Task 2
2. Screen 2
   1. Task 1
3. Screen 3

## Exporting to another format
The `index.ts` file will parse the User Journey markdown files and create a data format which can be converted into 
different formats. 

So far MermaidJS and LucidChart CSV are supported.

NOTE: There is a bug in LucidChart's CSV import which means tasks won't have their User Journeys set up in the shape data