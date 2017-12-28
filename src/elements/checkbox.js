
/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */

import { FormBehavior } from './form.js';
import UIBase from '../utils/ui-component-base.js';
import Ripples from '../animations/rippler.js';
import Styler from '../utils/styler.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

const reflectedAttrs = [
  'checked',
];

const styles = {
  'display': 'inline',
  'min-height': '25px',
  'min-width': '25px',
  'background-color': '#DDD',
  'position': 'relative',
  ':hover': {
    'background-color': '#999',
  },
  ':after': {
    'contents':'""',
    'position': 'absolute',
    'display': 'none',
    'left': '9px',
    'top': '5px',
    'width': '5px',
    'height': '10px',
    'border': 'solid #fff',
    'border-width': '0 3px 3px 0',
    'transform': 'rotate(45deg)',
  },
};

const checkedClass = Styler.addStyles({
  ':after': { display: 'block' }
});


const checkedStyles = {
  'background-color': Styler.primaryDarkColor,
};

const debounce = (n, immed, f) => {
  let [fn, now] = (() => {
    switch(extractType(immed)) {
      case 'Boolean':
        return [f, immed];
      case 'Function':
        return [immed, false];
      default:
        throw new TypeError(`Unrecognized arguments ${immed} and ${f} to function debounce.`);
    }
  })();

  let timer = null;
  return function (...args) {
    if (timer === null && now) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    return timer;
  }
};

const Checkbox = (class Checkbox extends mix(HTMLElement).with(UIBase, FormBehavior, Ripples) {
  init () {
    super.init();
    this.applyStyles(styles);
  }
}).reflectToAttribute(reflectedAttrs);


export default Checkbox;
customElements.define('ui-checkbox', Checkbox);
