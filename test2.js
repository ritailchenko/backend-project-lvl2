import _ from 'lodash';

const stringify = (obj, symb = '  ', spaceCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      // если не объект отдаем значение
      return currentValue;
    }
    const indentSize = depth * spaceCount; // считаем кол-во отступов
    const currentIndent = symb.repeat(indentSize); // заполняем отступы нужным символом
    const bracketIndent = symb.repeat(indentSize - spaceCount);
    // для фигурных скобок отступ будет на spaceCount меньше
    // проходим по значения объект
    const lines = _.map(
      currentValue,
      (value, key) => `${currentIndent}${key}: ${iter(value, depth + 2)}`,
    );
    // отдаем результат
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(obj, 1);
};
// console.log(stringify(obj3));
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
  setting2: 'apple',
  setting5: {
    key5: 'value5',
  },
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

const stylish = (arr) => {
  const styledTree = arr.reduce((acc, obj) => {
    switch (obj.status) {
      case 'added':
        acc[`+ ${obj.key}`] = obj.value;

        break;
      case 'deleted':
        acc[`- ${obj.key}`] = obj.value;
        break;
      case 'unchanged':
        acc[`  ${obj.key}`] = obj.value;
        break;
      case 'changed':
        acc[`- ${obj.key}`] = `${obj.value2}`;
        acc[`+ ${obj.key}`] = `${obj.value1}`;

        break;
      case 'nested':
        acc[`  ${obj.key}`] = stylish(obj.children);

        break;
      default:
        return true;
    }
    return acc;
  }, {});
  return styledTree;
};

// stylish(buildTree(obj1, obj2));
console.log(stringify(stylish(buildTree(obj1, obj2))));
