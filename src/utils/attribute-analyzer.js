import extractType from '../../node_modules/extracttype/extracttype.js';

export default const processHTMLAttr = attr => {
  switch (extractType(attr)) {
    case 'Null':
    case 'Undefined':
      return null;

    case 'String':
      return attr.toLowerCase() === 'false' ? false : attr || true;

    default: return attr;
  }
};