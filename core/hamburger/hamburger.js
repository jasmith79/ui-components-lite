/*
 * fab.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component hamburger button.
 */

import { CoreElementMixin } from 'core';

const INNERHTML = `
   <div class="hamburger-line"></div>
   <div class="hamburger-line"></div>
   <div class="hamburger-line"></div>
`;

const HamburgerMixin = {
  // If you dynamically modify the size of the hamburger button, be sure to call this afterwards.
  ratioize () {
    this.style.height = window.getComputedStyle(this).width;
    return this;
  }
};

const Hamburger = function Hamburger(el=document.createElement('div')) {
  el.classList.add('ui-component-hamburger');
  el.innerHTML = INNERHTML;
  return Object.assign(el, CoreElementMixin, HamburgerMixin)
    .ratioize()
    .wrapContent()
    .centerContent({text: true});
};

// Initialize all hamburger menu buttons present in the DOM
document.querySelectorAll('.ui-component-hamburger').forEach(Hamburger);

export default Hamburger;