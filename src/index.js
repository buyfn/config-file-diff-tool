import fs from 'fs';
import array from 'lodash/array';
import jsyaml from 'js-yaml';

const parse = (pathToFile) => {
  const parseMap = {
    json: p => JSON.parse(fs.readFileSync(p)),
    yaml: p => jsyaml.load(fs.readFileSync(p)),
  };

  const parts = pathToFile.split('.');
  const format = parts[parts.length - 1];

  return parseMap[format](pathToFile);
};

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = parse(pathToFile1);
  const fileContent2 = parse(pathToFile2);

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
