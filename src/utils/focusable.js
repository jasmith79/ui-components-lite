/*
 * focusable.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * Mixin for custom elements that can receive keyboard focus. Also includes a special event
 * emission when the user presses the enter key.
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
      if (e.keyCode === 13 || e.key === 'Enter') {
        const evt = new CustomEvent('enter-key');
        evt.keyCode = 13;
        this.dispatchEvent(evt);
      }
    });
  }
}
