import fs from 'fs';
import array from 'lodash/array';
import jsyaml from 'js-yaml';
import ini from 'ini';

const read = (pathToFile) => {
  const format = array.last(pathToFile.split('.'));
  const content = fs.readFileSync(pathToFile, 'utf8');

  return { content, format };
};

const parse = (file) => {
  const parserMap = {
    json: JSON.parse,
    yaml: jsyaml.load,
    ini: ini.parse,
  };

  return parserMap[file.format](file.content);
};

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = parse(read(pathToFile1));
  const fileContent2 = parse(read(pathToFile2));

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
