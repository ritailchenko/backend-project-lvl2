import fs from 'fs';
import path from 'path';
import ast from './ast.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import parser from './parsers.js';

const getData = (pathToFile) => parser[path.extname(pathToFile).slice(1)](
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

  return getFormatter[format](diff);
};

export default genDiff;
