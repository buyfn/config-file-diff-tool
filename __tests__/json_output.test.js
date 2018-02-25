import fs from 'fs';
import gendiff from '../src';
import renderer from '../src/renderers/json';

describe('gendiff plain files', () => {
  test('json plain', () => {
    const pathToFile1 = '__tests__/__fixtures__/json/before.json';
    const pathToFile2 = '__tests__/__fixtures__/json/after.json';
    const result = JSON.parse(fs.readFileSync('__tests__/__fixtures__/json_output/expected.json', 'utf8'));
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(JSON.stringify(result));
  });
});
