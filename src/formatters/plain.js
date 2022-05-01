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
    const output = children.flatMap((child) =>
      mapping[child.type](child, pathToRoot),
    );
    const filteredLines = output.filter((line) => line !== '');

    return filteredLines.join('\n');
  },
  added: ({ key, value }, pathToRoot) =>
    `Property '${pathToRoot}${key}' was added with value: ${stringify(value)}`,
  deleted: ({ key }, pathToRoot) =>
    `Property '${pathToRoot}${key}' was removed`,
  unchanged: () => '',
  changed: ({ key, value1, value2 }, pathToRoot) =>
    `Property '${pathToRoot}${key}' was updated. From ${stringify(
      value1,
    )} to ${stringify(value2)}`,
  nested: ({ key, children }, pathToRoot) => {
    const output = children.children.flatMap((child) =>
      mapping[child.type](child, `${pathToRoot}${key}.`),
    );
    return output;
  },
};

const plain = (ast) => {
  let pathToRoot = '';
  const iter = (node) => mapping.root(node, pathToRoot);
  return iter(ast, pathToRoot);
};
export default plain;

// const stringify = (value) => {
//   if (value === null) {
//     return null;
//   }
//   if (_.isObject(value)) {
//     return '[complex value]';
//   }
//   if (_.isString(value)) {
//     return `'${value}'`;
//   }
//   return value;
// };

// const plain = (ast) => {
//   const result = (nodes, pathToRoot = '') =>
//     nodes.children.flatMap((node) => {
//       const { key, value, type, value1, value2, children } = node;
//       switch (type) {
//         case 'added':
//           return `Property '${pathToRoot}${key}' was added with value: ${stringify(
//             value,
//           )}`;
//         case 'deleted':
//           return `Property '${pathToRoot}${key}' was removed`;
//         case 'changed':
//           return `Property '${pathToRoot}${key}' was updated. From ${stringify(
//             value1,
//           )} to ${stringify(value2)}`;
//         case 'unchanged':
//           break;
//         case 'nested':
//           return [...result(children, `${pathToRoot}${key}.`)];
//         default:
//           throw new Error(`Unknown type: ${type}`);
//       }
//     });

//   const lines = result(ast);
//   const filteredLines = lines.filter((line) => line);

//   return [...filteredLines].join('\n');
// };
