import extractType from '../../node_modules/extracttype/extracttype.js';
export const FALSE = Symbol('false');
export const processHTMLAttr = attr => {
  switch (extractType(attr)) {
    case 'Null':
    case 'Undefined':
      return FALSE;
    case 'Boolean': return attr ? attr : FALSE;
    case 'String':
      return (() => {
        const lower = attr.toLowerCase();
        if (attr === 'false') return FALSE; // NOTE: empty string should be true
        return attr;
      })();

    default: return FALSE;
  }
};
