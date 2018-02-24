#!/usr/bin/env node
import program from 'commander';
import gendiff from '../';
import getRenderer from '../renderers';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two files, shows how they differ.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) =>
    console.log(gendiff(firstConfig, secondConfig, getRenderer(program.format))))
  .parse(process.argv);
