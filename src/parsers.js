import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

// const parser = (file) => {
//   const fileExt = path.extname(file);
//   console.log(fileExt);
//   const pathToFile = path.resolve('__fixtures__', file);

//   if (fileExt === '.yaml' || fileExt === '.yml') {
//     const data = yaml.load(fs.readFileSync(pathToFile, 'utf8'));

//     return data;
//   }
//   if (fileExt === '.json') {
//     const data = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
//     return data;
//   }
//   return undefined;
// };

const parser = {
  json: (file) =>
    JSON.parse(fs.readFileSync(path.resolve('__fixtures__', file), 'utf8')),
  yaml: (file) =>
    yaml.load(fs.readFileSync(path.resolve('__fixtures__', file), 'utf8')),
  yml: (file) =>
    yaml.load(fs.readFileSync(path.resolve('__fixtures__', file), 'utf8')),
};

export default parser;
