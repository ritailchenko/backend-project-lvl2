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
  // return `{\n${sortedResultArrayToString.join('\n')}\n}`;
};
// console.log(buildTree(obj1, obj2));

const styledTree = (arr) => {
  // console.log(arr);
  const tree = arr.reduce((acc, obj) => {
    switch (obj.type) {
      case 'added':
        // console.log(obj);
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
        throw new Error(`Unknown status: ${obj.status}!`);
    }
    return acc;
  }, {});
  // console.log(tree);
  return tree;
};

const json = (array) => JSON.stringify(styledTree(array), null, 3);

export default json;
