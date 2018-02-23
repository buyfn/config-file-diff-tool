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
  const iter = (acc, ks) => {
    if (ks.length === 0) {
      return acc;
    }

    const key = ks[0];
    const before = obj1[key];
    const after = obj2[key];

    if ((before instanceof Object) && (after instanceof Object)) {
      const node = {
        key,
        status: 'nested',
        children: buildAST(before, after),
      };
      return iter([...acc, node], _.tail(ks));
    }
    if (before && after) {
      if (before === after) {
        const node = {
          key,
          status: 'unchanged',
          before,
        };
        return iter([...acc, node], _.tail(ks));
      }
      const deletedNode = {
        key,
        status: 'deleted',
        before,
      };
      const addedNode = {
        key,
        status: 'added',
        after,
      };
      return iter([...acc, deletedNode, addedNode], _.tail(ks));
    }
    if (!before) {
      const node = {
        key,
        status: 'added',
        after,
      };
      return iter([...acc, node], _.tail(ks));
    }
    const node = {
      key,
      status: 'deleted',
      before,
    };
    return iter([...acc, node], _.tail(ks));
  };

  const keys = _.union(_.keys(obj1), _.keys(obj2));

  return iter([], keys);
};

const render = (ast, depth = 1) => {
  const tabWidth = 4;
  const indent = ' '.repeat(depth * tabWidth);
  const valToStr = (v, d = depth + 1) => {
    if (v instanceof Object) {
      const ind = ' '.repeat(d * tabWidth);
      const elts = _.keys(v).map(key => `${ind}${key}: ${valToStr(v[key])}`);
      return `{\n${elts.join('\n')}\n${indent}}`;
    }
    return v;
  };
  const toStr = (node) => {
    const {
      key,
      status,
      before,
      after,
      children,
    } = node;

    switch (status) {
      case 'nested':
        return `${indent}${key}: ${render(children, depth + 1)}`;
      case 'unchanged':
        return `${indent}${key}: ${valToStr(before)}`;
      case 'deleted':
        return `${indent.slice(2)}- ${key}: ${valToStr(before)}`;
      case 'added':
        return `${indent.slice(2)}+ ${key}: ${valToStr(after)}`;
      default:
        return '';
    }
  };

  const rendered = ast.reduce((acc, node) => ([...acc, toStr(node)]), []);
  return `{\n${rendered.join('\n')}\n${indent.slice(tabWidth)}}`;
};

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = parse(read(pathToFile1), path.extname(pathToFile1));
  const fileContent2 = parse(read(pathToFile2), path.extname(pathToFile2));

  const ast = buildAST(fileContent1, fileContent2);

  return render(ast);
};

export default gendiff;
