import _ from 'lodash';

const stylish = (arr) => {
  // console.log(arr);
  const styledTree = arr.reduce((acc, obj) => {
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
        acc[`  ${obj.key}`] = stylish(obj.children);
        break;
      default:
        return true;
    }
    return acc;
  }, {});

  const iter = (currentValue, depth) => {
    const spaceCount = 1;
    const indent = '  ';
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const indentSize = depth * spaceCount;
    const currentIndent = indent.repeat(indentSize);
    const bracketIndent = indent.repeat(indentSize - spaceCount);

    const lines = _.map(
      currentValue,
      (value, key) => `${currentIndent}${key}: ${iter(value, depth + 2)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(styledTree, 1);
};
export default stylish;
