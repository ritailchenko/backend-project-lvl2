import fs from 'fs';
import path from 'path';
import buildAstTree from './buildAstTree.js';
import parser from './parsingFile.js';
import getFormatter from './formatters/index.js';

const getData = (pathToFile) => {
  const file = fs.readFileSync(path.resolve('__fixtures__', pathToFile), 'utf8');
  const format = path.extname(pathToFile).slice(1);
  const parse = parser[format];

  return parse(file);
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  const diff = buildAstTree(data1, data2);

  // if (format !== 'stylish' || format !== 'plain' || format !== 'json') {
  //   throw new Error(`Wrong format: ${format}`);
  // } else {
  //   return getFormatter[format](diff);
  // }
  return getFormatter[format](diff);
};

export default genDiff;
