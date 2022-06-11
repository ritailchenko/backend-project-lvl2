import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
// import { beforeAll, describe, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

let stringForStylish;
let stringForPlain;
let stringForJson;

beforeAll(() => {
  stringForStylish = readFixture('testStringForStylish.txt');
  stringForPlain = readFixture('testStringForPlain.txt');
  stringForJson = readFixture('testStringForJson.txt');
});

test('file1.json compare to file2.json to equal testStringForStylish', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(
    stringForStylish,
  );
});
test('file1.yaml compare to file2.yaml to equal testStringForStylish', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(
    stringForStylish,
  );
});
test('file1.json compare to file2.json to equal testStringForPlain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(stringForPlain);
});
test('file1.yaml compare to file2.yaml to equal testStringForPlain', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(stringForPlain);
});
test('file1.json compare to file2.json to equal testStringForJson', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(stringForJson);
});
test('file1.yaml compare to file2.yaml to equal testStringForJson', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(stringForJson);
});

/// Expected: undefined

// describe('file1 compare to file2', () => {
//   test.each([
//     { a: 'file1.json', b: 'file2.json', c: 'stylish', expected: stringForStylish },
//   ])('.genDiff(%a, %b, %c)', ({ a, b, c, expected }) => {
//     expect(genDiff(a, b, c)).toEqual(expected);
//   });
// });
