import _ from 'lodash';

const plain = (arr) => {
  const resultArray = arr.reduce((acc, obj) => {
    switch (obj.status) {
      case 'nested':
        obj.children.forEach((elem) => {
          elem.key = `${obj.key}.${elem.key}`;
        });
        acc.push(plain(obj.children));
        break;
      case 'added':
        if (_.isObject(obj.value)) {
          acc.push(
            `Property '${obj.key}' was added with value: [complex value]`,
          );
        } else if (typeof obj.value === 'string') {
          acc.push(
            `Property '${obj.key}' was added with value: '${obj.value}'`,
          );
        } else {
          acc.push(`Property '${obj.key}' was added with value: ${obj.value}`);
        }
        break;
      case 'deleted':
        acc.push(`Property '${obj.key}' was removed`);
        break;
      case 'changed':
        if (_.isObject(obj.value1)) {
          if (typeof obj.value2 === 'string') {
            acc.push(
              `Property '${obj.key}' was updated. From [complex value] to '${obj.value2}'`,
            );
          } else {
            acc.push(
              `Property '${obj.key}' was updated. From [complex value] to ${obj.value2}`,
            );
          }
        } else if (_.isObject(obj.value2)) {
          if (typeof obj.value1 === 'string') {
            acc.push(
              `Property '${obj.key}' was updated. From '${obj.value1}' to [complex value]`,
            );
          } else {
            acc.push(
              `Property '${obj.key}' was updated. From ${obj.value1} to [complex value]`,
            );
          }
        } else if (
          typeof obj.value1 === 'string' &&
          typeof obj.value2 === 'string'
        ) {
          acc.push(
            `Property '${obj.key}' was updated. From '${obj.value1}' to '${obj.value2}'`,
          );
        } else if (typeof obj.value1 === 'string') {
          acc.push(
            `Property '${obj.key}' was updated. From '${obj.value1}' to ${obj.value2}`,
          );
        } else if (typeof obj.value2 === 'string') {
          acc.push(
            `Property '${obj.key}' was updated. From ${obj.value1} to '${obj.value2}'`,
          );
        } else {
          acc.push(
            `Property '${obj.key}' was updated. From ${obj.value1} to ${obj.value2}`,
          );
        }
        break;
      case 'unchanged':
        break;
      default:
        throw new Error(`Unknown status: ${obj.status}!`);
    }
    return acc;
  }, []);
  return _.flatten(resultArray).join('\n');
};
export default plain;
