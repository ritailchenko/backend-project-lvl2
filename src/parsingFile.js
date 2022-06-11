import yaml from 'js-yaml';

const parsingFile = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default parsingFile;
