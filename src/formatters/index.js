import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = {
  stylish: (diff) => stylish(diff),
  plain: (diff) => plain(diff),
  json: (diff) => JSON.stringify(diff),
};

export default getFormatter;
