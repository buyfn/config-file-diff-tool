import fs from 'fs';
import path from 'path';
import array from 'lodash/array';
import jsyaml from 'js-yaml';
import ini from 'ini';

const read = pathToFile => fs.readFileSync(pathToFile, 'utf8');

const parse = (text, format) => {
  const parserMap = {
    '.json': JSON.parse,
    '.yaml': jsyaml.load,
    '.ini': ini.parse,
  };

  return parserMap[format](text);
};

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = parse(read(pathToFile1), path.extname(pathToFile1));
  const fileContent2 = parse(read(pathToFile2), path.extname(pathToFile2));

  const keys = array.union(Object.keys(fileContent1), Object.keys(fileContent2));

  const diff = keys.reduce((acc, key) => {
    if (fileContent1[key] && fileContent2[key]) {
      if (fileContent1[key] !== fileContent2[key]) {
        return [...acc, `  + ${key}: ${fileContent2[key]}`, `  - ${key}: ${fileContent1[key]}`];
      }
      return [...acc, `  ${key}: ${fileContent1[key]}`];
    }
    if (fileContent1[key]) {
      return [...acc, `  - ${key}: ${fileContent1[key]}`];
    }
    return [...acc, `  + ${key}: ${fileContent2[key]}`];
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};

export default gendiff;
