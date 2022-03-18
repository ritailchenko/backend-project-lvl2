const data = { hello: 'world', is: true, nested: { count: 5 } };
// {
//  hello: world
//  is: true
//  nested: {
//   count: 5
//  }
// }

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
