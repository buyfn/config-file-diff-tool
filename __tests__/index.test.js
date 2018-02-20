import gendiff from '../src';

test('checks gendiff', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const result = `{
  host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(gendiff(pathToFile1, pathToFile2)).toBe(result);
});
