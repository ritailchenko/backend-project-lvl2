import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import ast from './ast.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import parser from './parsers.js';

const getData = (pathToFile) =>
  parser[path.extname(pathToFile).slice(1)](
    fs.readFileSync(path.resolve('__fixtures__', pathToFile), 'utf8'),
  );

const getFormatter = {
  stylish: (diff) => stylish(diff),
  plain: (diff) => plain(diff),
  json: (diff) => JSON.stringify(diff, null, 3),
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  const diff = ast(data1, data2);

  return getFormatter[format.format](diff);
};

// const genDiff = (file1, file2, format) => {
//   const pathToFile1 = fs.readFileSync(
//     path.resolve('__fixtures__', file1),
//     'utf8',
//   );
//   const pathToFile2 = fs.readFileSync(
//     path.resolve('__fixtures__', file2),
//     'utf8',
//   );
//   let data1;
//   let data2;

//   if (!_.isObject(file1) && !_.isObject(file2)) {
//     data1 = parser[file1.split('.')[1]](pathToFile1);
//     data2 = parser[file2.split('.')[1]](pathToFile2);
//   } else {
//     data1 = file1;
//     data2 = file2;
//   }

//   switch (format.format) {
//     case 'stylish':
//       return stylish(ast(data1, data2));
//     case 'plain':
//       return plain(ast(data1, data2));
//     case 'json':
//       return JSON.stringify(ast(data1, data2), null, 3);
//     default:
//       throw new Error(`Unknown format: ${format.format}!`);
//   }
// };

export default genDiff;
