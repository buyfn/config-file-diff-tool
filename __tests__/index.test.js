import fs from 'fs';
import gendiff from '../src';

describe('gendiff', () => {
  test('json', () => {
    const pathToFile1 = '__tests__/__fixtures__/json/before.json';
    const pathToFile2 = '__tests__/__fixtures__/json/after.json';
    const result = fs.readFileSync('__tests__/__fixtures__/json/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2)).toBe(result);
  });

  test('yaml', () => {
    const pathToFile1 = '__tests__/__fixtures__/yaml/before.yaml';
    const pathToFile2 = '__tests__/__fixtures__/yaml/after.yaml';
    const result = fs.readFileSync('__tests__/__fixtures__/yaml/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2)).toBe(result);
  });

  test('ini', () => {
    const pathToFile1 = '__tests__/__fixtures__/ini/before.ini';
    const pathToFile2 = '__tests__/__fixtures__/ini/after.ini';
    const result = fs.readFileSync('__tests__/__fixtures__/ini/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2)).toBe(result);
  });
});
