import yaml from 'js-yaml';

const parser = {
  json: (file) => JSON.parse(file),
  yaml: (file) => yaml.load(file),
  yml: (file) => yaml.load(file),
};

export default parser;
