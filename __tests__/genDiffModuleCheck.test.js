import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stringForStylish = readFile('testStringForStylish.txt').trim();
const stringForPlain = readFile('testStringForPlain.txt').trim();
const stringForJson = readFile('testStringForJson.txt').trim();

test('file1.json compare to file2.json to equal testStringForStylish', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')).toMatch(
    stringForStylish,
  );
});
test('file1.yaml compare to file2.yaml to equal testStringForStylish', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toMatch(
    stringForStylish,
  );
});
test('file1.json compare to file2.json to equal testStringForPlain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toMatch(stringForPlain);
});
test('file1.yaml compare to file2.yaml to equal testStringForPlain', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toMatch(stringForPlain);
});
test('file1.json compare to file2.json to equal testStringForJson', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toMatch(stringForJson);
});
test('file1.yaml compare to file2.yaml to equal testStringForJson', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toMatch(stringForJson);
});
