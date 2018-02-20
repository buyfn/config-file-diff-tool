#!/usr/bin/env node
import program from 'commander';
import version from '../../package.json';
import gendiff from '../';

program
  .version(version)
  .description('Compares two files, shows how they differ.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig)))
  .parse(process.argv);
