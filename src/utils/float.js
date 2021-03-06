/*
 * float.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * floating mixin for ui-components-lite. Allows elements to easily add a vertical or horizontal
 * floating effect.
 */

import { defineUIComponent, document } from './dom.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host(.left-x) {
      box-shadow: 3px 0px 10px -3px #000;
      margin-right: 3px;
    }

    :host(.right-x) {
      box-shadow: -3px 0px 10px -3px #000;
      margin-left: 3px;
    }

    :host(.float-y) {
      box-shadow: 0px 3px 10px -3px #000;
      margin-bottom: 3px;
    }
  </style>
`;

const reflectedAttributes = [
  'floating-x',
  'floating-y',
  'right-oriented',
  'left-oriented',
];

export default superclass => defineUIComponent({
  name: 'ui-floating',
  reflectedAttributes,
  template,
  registerElement: false,
  definition: class Floating extends superclass {
    get isFloating () {
      return this.floatingX || this.floatingY;
    }

    init () {
      super.init();
      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'floating-y':
            return now ? this.classList.add('float-y') : this.classList.remove('float-y');

          case 'floating-x':
            const class_ = this.attr('right-oriented') ? 'right-x' : 'left-x';
            return now ? this.classList.add(class_) : this.classList.remove(class_);

          case 'right-oriented':
            if (this.classList.contains('left-x')) {
              this.classList.remove('left-x');
              this.classList.add('right-x');
            }
            return;

          case 'left-oriented':
          if (this.classList.contains('right-x')) {
            this.classList.remove('right-x');
            this.classList.add('left-x');
          }
          return;
        }
      });
    }
  }
});
