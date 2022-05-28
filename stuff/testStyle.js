import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const resultTree = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        children: buildTree(data1[key], data2[key]),
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
const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: { key5: 'value5' },
    setting6: { key: 'value', ops: 'vops', doge: { wow: 'so much' } },
  },
  group1: { foo: 'bar', baz: 'bars', nest: 'str' },
  group3: { deep: { id: { number: 45 } }, fee: 100500 },
};
const tree = buildTree(obj1, obj2);
// console.log(tree);

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth, mapping) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data).map(([key, value]) =>
    mapping.unchanged({ key, value }, depth + 1),
  );

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

const mapping = {
  root: ({ children }, depth, iter) => {
    const output = children.flatMap((child) =>
      mapping[child.type](child, depth + 1, iter),
    );

    return `{\n${output.join('\n')}\n}`;
  },
  added: (node, depth) =>
    `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, mapping)}`,
  deleted: (node, depth) =>
    `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, mapping)}`,
  unchanged: (node, depth) =>
    `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, mapping)}`,
  changed: (node, depth) => {
    const { key, value1, value2 } = node;

    const data1 = `${indent(depth)}- ${key}: ${stringify(
      value1,
      depth,
      mapping,
    )}`;
    const data2 = `${indent(depth)}+ ${key}: ${stringify(
      value2,
      depth,
      mapping,
    )}`;

    return [data1, data2];
  },
  nested: ({ key, children }, depth, iter) => {
    /// children.flatMap
    const output = children.children.flatMap((child) =>
      mapping[child.type](child, depth + 1, iter),
    );
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(
      depth,
    )}  }`;
  },
};

const renderTree = (ast) => {
  const iter = (node, depth) => mapping.root(node, depth, iter);
  iter(ast, 0);
};

console.log(renderTree(tree));
// renderTree(tree);
