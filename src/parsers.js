import yaml from 'js-yaml';

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
  json: (file) => JSON.parse(file),
  yaml: (file) => yaml.load(file),
  yml: (file) => yaml.load(file),
};

export default parser;
