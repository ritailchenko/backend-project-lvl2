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
        throw new Error(`Unknown status: ${obj.status}!`);
    }
    return acc;
  }, {});
  return tree;
};

const json = (array) => JSON.stringify(styledTree(array), null, 3);

export default json;
