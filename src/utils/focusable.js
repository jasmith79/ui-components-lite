/*
 * focusable.js
 * @author jasmith79@gmail.com
 * @copyright 2018
 * @license MIT
 *
 * Mixin for custom elements that can receive keyboard focus.
 */

export default superclass => class Focusable extends superclass {
  constructor () {
    super();
  }

  setActive () {
    const index = this.attr('tabindex');
    if (index === null || index < 0) this.attr('tabindex', '0');
    return this;
  }

  setInactive () {
    this.attr('tabindex', '-1');
    return this;
  }

  init () {
    super.init();
    if (this.attr('tabindex') === null) this.attr('tabindex', '-1');
    this.on('keydown', e => {
      if (e.keyCode === 13) {
        const evt = new CustomEvent('enter-key');
        evt.keyCode = 13;
        this.dispatchEvent(evt);
      }
    });
  }
}
