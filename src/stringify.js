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

export default stringify;
