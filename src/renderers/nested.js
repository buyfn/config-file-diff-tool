import _ from 'lodash';

const render = (ast, depth = 1) => {
  const tabWidth = 4;
  const indent = ' '.repeat(depth * tabWidth);
  const valToStr = (v, d = depth + 1) => {
    if (v instanceof Object) {
      const ind = ' '.repeat(d * tabWidth);
      const elts = _.keys(v).map(key => `${ind}${key}: ${valToStr(v[key], d + 1)}`);
      return `{\n${elts.join('\n')}\n${ind.slice(tabWidth)}}`;
    }
    return v;
  };
  const toStr = (node) => {
    const {
      key,
      type,
      before,
      after,
      children,
    } = node;

    switch (type) {
      case 'nested':
        return `${indent}${key}: ${render(children, depth + 1)}`;
      case 'unchanged':
        return `${indent}${key}: ${valToStr(before)}`;
      case 'updated':
        return `${indent.slice(2)}- ${key}: ${valToStr(before)}\n${indent.slice(2)}+ ${key}: ${valToStr(after)}`;
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

export default render;
