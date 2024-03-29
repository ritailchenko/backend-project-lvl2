import _ from 'lodash';

const stringify = (value) => {
  if (value === null) {
    return null;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const mapping = {
  root: ({ children }, pathToRoot) => {
    const output = children.flatMap((child) => mapping[child.type](child, pathToRoot));

    return output;
  },
  added: ({ key, value }, pathToRoot) => `Property '${pathToRoot}${key}' was added with value: ${stringify(value)}`,
  deleted: ({ key }, pathToRoot) => `Property '${pathToRoot}${key}' was removed`,
  unchanged: () => [],
  changed: ({ key, value1, value2 }, pathToRoot) => `Property '${pathToRoot}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  nested: ({ key, children }, pathToRoot) => {
    const output = children.flatMap((child) => mapping[child.type](child, `${pathToRoot}${key}.`));
    return output;
  },
};
export default (ast) => {
  const iter = (node, depth) => mapping[node.type](node, depth, iter);
  return iter(ast, []).join('\n');
};
