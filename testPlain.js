import _ from 'lodash';

const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
  genX: 'yes',
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: { key5: 'value5' },
    setting6: { key: 'value', ops: 'vops', doge: { wow: 'so much' } },
  },
  group1: { foo: 'bar', baz: 'bars', nest: 'str' },
  group3: { deep: { id: { number: 45 } }, fee: 100500 },
  genX: 'yes',
};

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const resultTree = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        children: buildTree(data1[key], data2[key]),
        status: 'nested',
      };
    }

    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        status: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        status: 'deleted',
      };
    }

    if (data1[key] !== data2[key]) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        status: 'changed',
      };
    }
    return {
      key,
      value: data1[key],
      status: 'unchanged',
    };
  });
  const sortedResultArray = _.sortBy(resultTree, [(o) => o.key]);
  return sortedResultArray;
};

// console.log(buildTree(obj1, obj2));

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
plain(buildTree(obj1, obj2));
// console.log(plain(buildTree(obj1, obj2)));
