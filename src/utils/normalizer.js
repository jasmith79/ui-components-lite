/*
 * normalizer.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * Utility file for ui-components-lite. Makes input elements act consistently cross-browser, wrt
 * the change event.
 */
import { global } from './ui-component-base.js';
import extractType from '../../../extracttype/extracttype.js';

const changeTriggers = [
  'keyup',
  'paste',
  'input',
];

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
    global.clearTimeout(timer);
    timer = global.setTimeout(() => fn.apply(this, args), n);
    return timer;
  }
};

// Makes input change event consistent across browsers
export const inputNormalizer = input => {
  let before = null;
  changeTriggers.forEach(evtName => input.addEventListener(evtName, debounce(500, e => {
    if (input.value !== before) {
      before = input.value;
      const evt = new Event('change');
      evt.value = input.value;
      input.dispatchEvent(evt);
    }
  })));

  input.addEventListener('focus', e => {
    before = input.value;
  });

  return input;
};
