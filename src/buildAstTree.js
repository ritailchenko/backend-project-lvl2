import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const treeBuilder = sortedKeys.map((key) => {
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
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: buildDiff(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
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

  return treeBuilder;
};

export default (data1, data2) => ({ type: 'root', children: buildDiff(data1, data2) });
