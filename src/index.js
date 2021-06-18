import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (file1, file2) => {
  const path1 = path.resolve('../backend-project-lvl2', file1);
  const path2 = path.resolve('../backend-project-lvl2', file2);

  const data1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(path2, 'utf8'));

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
  // console.log(sortedResultArray);

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
  // console.log(`{\n${sortedResultArrayToString.join('\n')} \n}`);

  return `{\n${sortedResultArrayToString.join('\n')} \n}`;
  // sortedResultArray.forEach((obj) => {
  //   if (obj.status === 'deleted') {
  //     console.log(`{ - ${obj.key}: ${obj.value}`);
  //   }

  //   if (obj.status === 'changed') {
  //     return ` - ${obj.key}: ${obj.value1}\n + ${obj.key}: ${obj.value2}`;
  //   }
  //   if (obj.status === 'added') {
  //     return ` + ${obj.key}: ${obj.value}`;
  //   }
  //   if (obj.status === 'unchanged') {
  //     return `   ${obj.key}: ${obj.value}`;
  //   }
  // });
};

// console.log(genDiff(file1, file2));

export default genDiff;
