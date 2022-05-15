import _ from 'lodash';

const ast = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  const resultTree = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        children: ast(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'deleted',
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'changed',
      };
    }
    return {
      key,
      value: data1[key],
      type: 'unchanged',
    };
  });
  const sortedResultArray = _.sortBy(resultTree, [(o) => o.key]);

  return { type: 'root', children: sortedResultArray };
};

export default ast;
