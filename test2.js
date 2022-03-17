import _ from 'lodash';

const stringify = (obj, symb = ' ', spaceCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      // если не объект отдаем значение
      return currentValue.toString();
    }
    const indentSize = depth * spaceCount; // считаем кол-во отступов
    const currentIndent = symb.repeat(indentSize); // заполняем отступы нужным символом
    const bracketIndent = symb.repeat(indentSize - spaceCount);
    // для фигурных скобок отступ будет на spaceCount меньше
    // проходим по значения объект
    const lines = _.map(
      currentValue,
      (value, key) => `${currentIndent}${key}: ${iter(value, depth + 1)}`,
    );
    // отдаем результат
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(obj, 1);
};

const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 'lamp',
    setting6: {
      doge: {
        wow: '',
      },
    },
  },
  setting2: 'orange',
};

const obj2 = {
  common: {
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting6: {
      goodbye: {
        wow: 'iceCream',
      },
    },
  },
  setting5: {
    key5: 'value5',
  },
  setting2: 'apple',
};

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const resultTree = keys.map((key) => {
    // console.log(data1);
    if (!_.has(data1, key)) {
      // console.log();
      return {
        key: `+ ${key}`,
        value: data2[key],
        status: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key: `- ${key}`,
        value: data1[key],
        status: 'deleted',
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key: `  ${key}`,

        children: buildTree(data1[key], data2[key]),
        status: 'nested',
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        key: `  ${key}`,
        value1: data1[key],
        value2: data2[key],
        status: 'changed',
      };
    }
    return {
      key: `  ${key}`,
      value: data1[key],
      status: 'unchanged',
    };
  });
  const sortedResultArray = _.sortBy(resultTree, [(o) => o.key]);
  console.log(sortedResultArray);

  const sortedResultArrayToString = sortedResultArray.reduce((acc, currVal) => {
    if (currVal.status === 'deleted') {
      acc[currVal.key] = currVal.value;
    }
    if (currVal.status === 'changed') {
      // acc.push(
      //   `  - ${currVal.key}: ${currVal.value1}\n  + ${currVal.key}: ${currVal.value2}`,
      // );
      acc[currVal.key] = `-${currVal.value1}\n            +${currVal.value2}`;
    }
    if (currVal.status === 'added') {
      // acc.push(`  + ${currVal.key}: ${currVal.value}`);
      acc[currVal.key] = currVal.value;
    }
    if (currVal.status === 'unchanged') {
      acc[currVal.key] = currVal.value;
    }
    if (currVal.status === 'nested') {
      acc[currVal.key] = currVal.children;
    }

    return acc;
  }, {});

  return `{\n${sortedResultArrayToString.join('\n')}\n}`;
};

buildTree(obj1, obj2);
