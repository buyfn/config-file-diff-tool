import nestedRenderer from './nested';
import plainRenderer from './plain';
import jsonRenderer from './json';

const getRenderer = (format) => {
  const rendererMap = {
    plain: plainRenderer,
    json: jsonRenderer,
  };

  if (!format) {
    return nestedRenderer;
  }

  return rendererMap[format];
};

export default getRenderer;
