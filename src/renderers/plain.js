import _ from 'lodash';

const render = (ast) => {
  const valToStr = (value) => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `'${value}'`;
  };

  const toStr = (node, path = []) => {
    if (_.isArray(node)) {
      const [{ before, key }, { after }] = node;
      return `Property '${[...path, key].join('.')}' was updated from ${valToStr(before)} to ${valToStr(after)}`;
    }

    const {
      key, type, after, children,
    } = node;
    switch (type) {
      case 'nested':
        return children.map(n => toStr(n, [...path, key]))
          .filter(row => row !== '')
          .join('\n');
      case 'unchanged':
        return '';
      case 'added':
        return `Property '${[...path, key].join('.')}' was added with ${valToStr(after)}`;
      case 'deleted':
        return `Property '${[...path, key].join('.')}' was removed`;
      default:
        return '';
    }
  };

  return ast.map(toStr).filter(row => row !== '').join('\n');
};

export default render;
