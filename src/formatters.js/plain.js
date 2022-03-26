import _ from 'lodash';

const plain = (arr) => {
  // console.log(arr);
  const resultArray = arr.reduce((acc, obj) => {
    switch (obj.status) {
      case 'nested':
        obj.children.forEach((elem) => {
          elem.key = `${obj.key}.${elem.key}`;
          return obj.children;
        });
        plain(obj.children);
        break;
      case 'added':
        if (_.isObject(obj.value)) {
          acc.push(
            `Property '${obj.key}' was added with value: '[complex value]'`,
          );
        } else {
          acc.push(
            `Property '${obj.key}' was added with value: '${obj.value}'`,
          );
        }
        break;
      case 'deleted':
        acc.push(`Property '${obj.key}' was removed.`);
        break;
      case 'changed':
        if (_.isObject(obj.value1)) {
          acc.push(
            `Property '${obj.key}' was updated. From '[complex value]' to '${obj.value2}'`,
          );
        } else if (_.isObject(obj.value2)) {
          acc.push(
            `Property '${obj.key}' was updated. From '${obj.value2}' to '[complex value]'`,
          );
        } else {
          acc.push(
            `Property '${obj.key}' was updated. From '${obj.value1}' to '${obj.value2}'`,
          );
        }
        break;
      case 'unchanged':
        break;
      default:
        return true;
    }
    return acc;
  }, []);
  console.log(resultArray.join('\n'));
  // return resultArray;
};
export default plain;
