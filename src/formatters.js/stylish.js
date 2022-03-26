import _ from 'lodash';

const styledTree = (arr) => {
  const tree = arr.reduce((acc, obj) => {
    switch (obj.status) {
      case 'added':
        acc[`+ ${obj.key}`] = obj.value;
        break;
      case 'deleted':
        acc[`- ${obj.key}`] = obj.value;
        break;
      case 'unchanged':
        acc[`  ${obj.key}`] = obj.value;
        break;
      case 'changed':
        acc[`- ${obj.key}`] = obj.value1;
        acc[`+ ${obj.key}`] = obj.value2;
        break;
      case 'nested':
        acc[`  ${obj.key}`] = styledTree(obj.children);
        break;
      default:
        return true;
    }
    return acc;
  }, {});
  return tree;
};

const stringify = (value, replacer = '  ') => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indent = replacer.repeat(depth);

    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${indent}${key}: ${iter(val, depth + 2)}`,
    );

    return ['{', ...lines, `${indent}}`].join('\n');
  };

  return iter(value, 1);
};

const stylish = (array) => stringify(styledTree(array));

export default stylish;
