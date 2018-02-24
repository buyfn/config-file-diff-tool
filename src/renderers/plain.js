const render = (ast) => {
  const valToStr = (value) => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `'${value}'`;
  };

  const toStr = (node, path = []) => {
    const {
      key, type, before, after, children,
    } = node;

    switch (type) {
      case 'nested':
        return children.map(n => toStr(n, [...path, key]))
          .filter(row => row !== '')
          .join('\n');
      case 'unchanged':
        return '';
      case 'updated':
        return `Property '${[...path, key].join('.')}' was updated from ${valToStr(before)} to ${valToStr(after)}`;
      case 'added':
        return `Property '${[...path, key].join('.')}' was added with ${valToStr(after)}`;
      case 'deleted':
        return `Property '${[...path, key].join('.')}' was removed`;
      default:
        return '';
    }
  };

  return ast.map(n => toStr(n)).filter(row => row !== '').join('\n');
};

export default render;
