import ast from './ast.js';
import stylish from './formatters.js/stylish.js';
import plain from './formatters.js/plain.js';

const genDiff = (file1, file2, format) => {
  switch (format.format) {
    case 'stylish':
      return stylish(ast(file1, file2));
    case 'plain':
      return plain(ast(file1, file2));
    default:
      throw new Error(`Unknown formater: ${format.format}!`);
  }
};

export default genDiff;
