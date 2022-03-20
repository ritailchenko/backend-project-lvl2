const stylish = (arr) => {
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
        acc[`- ${obj.key}`] = `${obj.value2}`;
        acc[`+ ${obj.key}`] = `${obj.value1}`;
        break;
      case 'nested':
        acc[`  ${obj.key}`] = stylish(obj.children);
        break;
      default:
        return true;
    }
    return acc;
  }, {});
  return styledTree;
};

export default stylish;
