import fs from 'fs';
import gendiff from '../src';
import renderer from '../src/renderers/plain';

describe('gendiff plain files', () => {
  test('json plain', () => {
    const pathToFile1 = '__tests__/__fixtures__/json/before.json';
    const pathToFile2 = '__tests__/__fixtures__/json/after.json';
    const result = fs.readFileSync('__tests__/__fixtures__/plain_output/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });
});

describe('gendiff nested files', () => {
  test('json nested', () => {
    const pathToFile1 = '__tests__/__fixtures__/json/before_nested.json';
    const pathToFile2 = '__tests__/__fixtures__/json/after_nested.json';
    const result = fs.readFileSync('__tests__/__fixtures__/plain_output/expected_nested.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });
});

