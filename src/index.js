import ast from './ast.js';
import stylish from './stylish.js';

const genDiff = (file1, file2, format) => {
  if (format === 'stylish') {
    return stylish(ast(file1, file2));
  }
};

export default genDiff;
