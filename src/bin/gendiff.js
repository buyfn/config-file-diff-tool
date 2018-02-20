#!/usr/bin/env node
import program from 'commander';
import version from '../../package.json';

program
  .version(version)
  .description('Compares two files, shows how they differ.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
