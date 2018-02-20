import program from 'commander';

program
  .version('0.1.0')
  .description('Compares two files, shows how they differ.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format');

export default program;
