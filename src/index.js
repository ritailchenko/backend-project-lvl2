import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (file1, file2) => {
  const data1 = parser(file1);
  const data2 = parser(file2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = keys.map((key) => {
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

  const sortedResultArray = _.sortBy(result, [(o) => o.key]);

  const sortedResultArrayToString = sortedResultArray.reduce((acc, currVal) => {
    if (currVal.status === 'deleted') {
      acc.push(`  - ${currVal.key}: ${currVal.value}`);
    }
    if (currVal.status === 'changed') {
      acc.push(
        `  - ${currVal.key}: ${currVal.value1}\n  + ${currVal.key}: ${currVal.value2}`,
      );
    }
    if (currVal.status === 'added') {
      acc.push(`  + ${currVal.key}: ${currVal.value}`);
    }
    if (currVal.status === 'unchanged') {
      acc.push(`    ${currVal.key}: ${currVal.value}`);
    }
    return acc;
  }, []);

  return `{\n${sortedResultArrayToString.join('\n')}\n}`;
};

export default genDiff;
