/*
 * attribute-analyzer.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * attribute-analyzer utility for ui-components-lite. Takes the value returned by
 * HTMLElement.getAttribute and returns an appropriate value: if the attribute is a valid string
 * representation of e.g. a number or boolean, then this will return the number or boolean rather
 * than a string.
 */

import extractType from '../../node_modules/extracttype/extracttype.js';

const processHTMLAttr = attr => {
  switch (extractType(attr)) {
    case 'Null':
    case 'Undefined':
      return null;

    case 'String':
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
