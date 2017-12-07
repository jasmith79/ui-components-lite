import styler from './styler.js';
const styles = {
  leftX : styler.getClassList({'box-shadow': '3px 0px 10px -3px #000'}),
  rightX: styler.getClassList({'box-shadow': '-3px 0px 10px -3px #000'}),
  floatY: styler.getClassList({'box-shadow': '0px 3px 10px -3px #000'}),
};

const reflectedAttrs = [
  'floating-x',
  'floating-y',
  'right-oriented',
  'left-oriented',
];

export default superclass => class Floating extends superclass {
  constructor (...args) {
    super(...args);
    this._isFloatingX = false;
    this._isFloatingY = false;
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  get isFloating () {
    return this._isFloatingX || this._isFloatingY;
  }

  set floatingX (val) {
    switch (val) {
      case false:
      case 'false':
      case null:
      case undefined:
        this.isFloatingX = false;
        this.classList.remove(...styles.rightX, ...styles.leftX);
        break;

      default:
        const rt = this.getAttribute('right-oriented');
        const pos = rt === 'false' || rt == null ? 'left' : 'right';
        this._isFloatingX = true;
        this.classList.add(...styles[`${pos}X`]);
        break;
    }
    return this;
  }

  set floatingY (bool) {
    switch (bool) {
      case false:
      case 'false':
        this._isFloatingY = false;
        this.classList.remove(...styles.floatY);
        break;

      default:
        this._isFloatingY = true;
        this.classList.add(...styles.floatY);
        break;
    }
    return this;
  }

  init () {
    super.init();
    return;
  }
}
