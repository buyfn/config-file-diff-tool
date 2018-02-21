import fs from 'fs';
import array from 'lodash/array';

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = JSON.parse(fs.readFileSync(pathToFile1));
  const fileContent2 = JSON.parse(fs.readFileSync(pathToFile2));

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
