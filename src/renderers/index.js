import treeRenderer from './nested';
import plainRenderer from './plain';
import jsonRenderer from './json';

const getRenderer = (format = treeRenderer) => {
  const rendererMap = {
    tree: treeRenderer,
    plain: plainRenderer,
    json: jsonRenderer,
  };

  return rendererMap[format];
};

export default getRenderer;
