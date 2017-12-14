import extractType from '../../node_modules/extracttype/extracttype.js';

const processHTMLAttr = attr => {
  switch (extractType(attr)) {
    case 'Null':
    case 'Undefined':
      return null;

    case 'String':
      // return attr.toLowerCase() === 'false' ? false : attr || true;
      if (!attr) return true; // empty string, e.g. <ui-drawer is-modal></ui-drawer>
      let val;
      try {
        val = JSON.parse(attr); // numbers, bools, etc
      } catch (e) {
        val = attr;
      }
      return val;

    default: return attr;
  }
};

export default processHTMLAttr;
