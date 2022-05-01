import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

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
    const output = children.children.flatMap((child) =>
      mapping[child.type](child, depth + 1, iter),
    );
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(
      depth,
    )}  }`;
  },
};

const stylish = (ast) => {
  const iter = (node, depth) => mapping.root(node, depth, iter);
  return iter(ast, 0);
};

export default stylish;
