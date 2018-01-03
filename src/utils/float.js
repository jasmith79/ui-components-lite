import { defineUIComponent, document } from './dom.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host(.left-x) {
      box-shadow: 3px 0px 10px -3px #000;
    }

    :host(.right-x) {
      box-shadow: -3px 0px 10px -3px #000;
    }

    :host(.float-y) {
      box-shadow: 0px 3px 10px -3px #000;
    }
  </style>
`;

const reflectedAttrs = [
  'floating-x',
  'floating-y',
  'right-oriented',
  'left-oriented',
];

export default superclass => defineUIComponent({
  name: 'ui-floating',
  reflectedAttrs,
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
