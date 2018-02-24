import fs from 'fs';
import path from 'path';
import _ from 'lodash';
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

const buildAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const ast = keys.reduce((acc, key) => {
    const before = obj1[key];
    const after = obj2[key];

    if ((before instanceof Object) && (after instanceof Object)) {
      const node = { key, type: 'nested', children: buildAST(before, after) };
      return [...acc, node];
    }
    if (before && after) {
      if (before === after) {
        const node = { key, type: 'unchanged', before };
        return [...acc, node];
      }
      const node = {
        key, type: 'updated', before, after,
      };
      return [...acc, node];
    }
    if (!before) {
      const node = { key, type: 'added', after };
      return [...acc, node];
    }
    const node = { key, type: 'deleted', before };
    return [...acc, node];
  }, []);

  return ast;
};

const gendiff = (pathToFile1, pathToFile2, renderer) => {
  const fileContent1 = parse(read(pathToFile1), path.extname(pathToFile1));
  const fileContent2 = parse(read(pathToFile2), path.extname(pathToFile2));

  const ast = buildAST(fileContent1, fileContent2);

  return renderer(ast);
};

export default gendiff;
