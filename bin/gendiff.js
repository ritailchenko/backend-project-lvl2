#!/usr/bin/env node

const program = require('commander');
program.version('0.0.1');

// program.description(
// `Compares two configuration files and shows a difference.`
// );


// program.parse(process.argv);

//  -f, --format [type]  output format

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  
  // .action((filepath1, filepath2) => {
  //   console.log('filepath1:', filepath1);
  //   console.log('filepath2:', filepath2);
  // });

program.parse(process.argv);

const options = program.opts();
