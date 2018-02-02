/*
 * rippler.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * rippler animation component for ui-components-lite.
 */
import { document, defineUIComponent, global } from '../utils/dom.js';

import extractType from '../../../extracttype/extracttype.js';

const rippleEvents = ['click', 'tap', 'dblclick', 'enter-key'];
const handlerRegistry = new WeakMap();
const registerHandler = f => {
  const cached = handlerRegistry.get(f);
  let fn = cached || (e => { global.setTimeout(f, 500, e); });
  handlerRegistry.set(f, fn);
  return fn;
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transform: translate3d(0, 0, 0);
    }

    :host:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      transform: scale(10, 10);
      transition: transform .5s, opacity 1s;
      pointer-events: none;
      background-repeat: no-repeat;
      background-image: radial-gradient(circle, var(--ui-theme-ripple-color), 10%, transparent 10%);
      background-position: 50%;
    }

    :host(:active):after {
      opacity: .7;
      transform: scale(0, 0);
      transition: 0s;
      background-color: orange;
    }
  </style>
`;

export default superclass => defineUIComponent({
  name: 'ui-ripples',
  template,
  registerElement: false,
  definition: class Ripples extends superclass {

    // Here we want to intercept any handlers on events that trigger a ripple and delay them
    // to give the animation time to complete.
    on (evts, f) {
      const events = evts.split(/\s+/g);
      events.forEach(evt => {
        if (rippleEvents.includes(evt)) {
          // Here we'll want to cache a canonical version for later removal
          const fn = registerHandler(f);
          super.on(evt, fn);
        } else {
          super.on(evt, f);
        }
      });
    }

    // Similar intercept here for function arguments
    remove (...args) {
      const correctArgs = args.reduce((acc, arg) => {
        if (extractType(arg) === 'Function') {
          let cached = registerHandler(arg);
          acc.push(cached || arg);
        } else {
          acc.push(arg);
        }
        return acc;
      }, []);
      super.remove(...correctArgs);
    }
  }
});
