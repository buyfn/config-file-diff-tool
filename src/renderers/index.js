import nestedRenderer from './nested';
import plainRenderer from './plain';

const getRenderer = (format) => {
  const rendererMap = {
    plain: plainRenderer,
  };

  if (!format) {
    return nestedRenderer;
  }

  return rendererMap[format];
};

export default getRenderer;
