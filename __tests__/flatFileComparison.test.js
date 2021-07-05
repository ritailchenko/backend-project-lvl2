import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultedStr = readFile('resultedString.txt').trim();

test('file1.json compare to file2.json to equal resultedStr', () => {
  expect(genDiff('file1.json', 'file2.json')).toMatch(resultedStr);
});
