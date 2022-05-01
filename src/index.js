import ast from './ast.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const genDiff = (file1, file2, format) => {
  switch (format.format) {
    case 'stylish':
      return stylish(ast(file1, file2));
    case 'plain':
      return plain(ast(file1, file2));
    case 'json':
      return JSON.stringify(ast(file1, file2), null, 3);
    default:
      throw new Error(`Unknown format: ${format.format}!`);
  }
};

export default genDiff;
