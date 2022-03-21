import _ from 'lodash';
import parser from './parsers.js';

const ast = (file1, file2) => {
  let data1;
  let data2;

  if (!_.isObject(file1) && !_.isObject(file2)) {
    if (file1.split('.')[1] === 'yaml' || file1.split('.')[1] === 'json') {
      data1 = parser(file1);
    }
    if (file2.split('.')[1] === 'yaml' || file2.split('.')[1] === 'json') {
      data2 = parser(file2);
    }
  } else {
    data1 = file1;
    data2 = file2;
  }

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  const resultTree = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        children: ast(data1[key], data2[key]),
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

export default ast;
