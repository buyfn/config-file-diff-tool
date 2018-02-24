import fs from 'fs';
import gendiff from '../src';
import renderer from '../src/renderers/nested';

describe('gendiff plain files', () => {
  test('json plain', () => {
    const pathToFile1 = '__tests__/__fixtures__/json/before.json';
    const pathToFile2 = '__tests__/__fixtures__/json/after.json';
    const result = fs.readFileSync('__tests__/__fixtures__/json/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });

  test('yaml plain', () => {
    const pathToFile1 = '__tests__/__fixtures__/yaml/before.yaml';
    const pathToFile2 = '__tests__/__fixtures__/yaml/after.yaml';
    const result = fs.readFileSync('__tests__/__fixtures__/yaml/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });

  test('ini plain', () => {
    const pathToFile1 = '__tests__/__fixtures__/ini/before.ini';
    const pathToFile2 = '__tests__/__fixtures__/ini/after.ini';
    const result = fs.readFileSync('__tests__/__fixtures__/ini/expected.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });
});

describe('gendiff nested files', () => {
  test('json nested', () => {
    const pathToFile1 = '__tests__/__fixtures__/json/before_nested.json';
    const pathToFile2 = '__tests__/__fixtures__/json/after_nested.json';
    const result = fs.readFileSync('__tests__/__fixtures__/json/expected_nested.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });

  test('yaml nested', () => {
    const pathToFile1 = '__tests__/__fixtures__/yaml/before_nested.yaml';
    const pathToFile2 = '__tests__/__fixtures__/yaml/after_nested.yaml';
    const result = fs.readFileSync('__tests__/__fixtures__/yaml/expected_nested.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });

  test('yaml deeply nested', () => {
    const pathToFile1 = '__tests__/__fixtures__/yaml/before_deeply_nested.yaml';
    const pathToFile2 = '__tests__/__fixtures__/yaml/after_deeply_nested.yaml';
    const result = fs.readFileSync('__tests__/__fixtures__/yaml/expected_deeply_nested.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });

  test('ini nested', () => {
    const pathToFile1 = '__tests__/__fixtures__/ini/before_nested.ini';
    const pathToFile2 = '__tests__/__fixtures__/ini/after_nested.ini';
    const result = fs.readFileSync('__tests__/__fixtures__/ini/expected_nested.txt', 'utf8');
    expect(gendiff(pathToFile1, pathToFile2, renderer)).toBe(result);
  });
});
