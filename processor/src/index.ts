#! /usr/bin/env node
import { program } from 'commander'
import {
  mermaid,
  d2,
  lucidchart,
  statechart,
  reciprocal
} from './commands'


program
.command('mermaid')
.description('Produce Mermaid compatible flow chart definition from user flows')
.action(mermaid)

program
  .command('d2')
  .description('Produce D2 compatible flow chart definition from user flows')
  .action(d2)

program
  .command('lucidchart')
  .description('Produce CSV output for importing user flow map into LucidChart')
  .action(lucidchart)

program
  .command('statechart')
  .description('Produce Xstate state chart JSON definition from user flows')
  .action(statechart)

program
  .command('reciprocal')
  .description('Produce Reciprocal.dev JSON definition from user flows')
  .action(reciprocal)

program.parse(process.argv)