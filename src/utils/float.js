import processHTMLAttr from '../utils/attribute-analyzer.js';

const styles = {
  leftX : { 'box-shadow': '3px 0px 10px -3px #000' },
  rightX: { 'box-shadow': '-3px 0px 10px -3px #000' },
  floatY: { 'box-shadow': '0px 3px 10px -3px #000' },
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
    if (processHTMLAttr(val)) {
      const pos = this.attr('right-oriented') ? 'right' : 'left';
      this._isFloatingX = true;
      return this.applyStyles(styles[`${pos}X`]);
    } else {
      this._isFloatingX = false;
      return this.removeStyles(styles.rightX, styles.leftX);
    }
  }

  set floatingY (val) {
    if (processHTMLAttr(val)) {
      this._isFloatingY = true;
      return this.applyStyles(styles.floatY);
    } else {
      this._isFloatingY = false;
      return this.removeStyles(styles.floatY);
    }
  }
}
