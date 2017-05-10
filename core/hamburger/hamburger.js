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
    let heightPx = window.getComputedStyle(this).width
    this.style.height = heightPx;
    let contentHeight = +window
      .getComputedStyle(this.querySelector('.ui-component-content-wrapper'))
      .height
      .match(/[\d\.]+/)[0];

    let lineHeight = +window
      .getComputedStyle(this.querySelector('.hamburger-line'))
      .height
      .match(/[\d\.]+/)[0];

    let inBetween = Math.round((lineHeight * 2) / 3);
    let marginTop = (contentHeight - ((lineHeight * 3) + (inBetween * 2))) / 2;
    let [first, ...rest] = Array.from(this.querySelectorAll('.hamburger-line'));
    first.style.marginTop = `${marginTop}px`;
    rest.forEach(hl => hl.style.marginTop = `${inBetween}px`);
    return this;
  }
};

const Hamburger = function Hamburger(el=document.createElement('div')) {
  el.classList.add('ui-component-hamburger');
  el.innerHTML = INNERHTML;
  return Object.assign(el, CoreElementMixin, HamburgerMixin)
    .wrapContent()
    .centerContent()
    .ratioize();
};

// Initialize all hamburger menu buttons present in the DOM
document.querySelectorAll('.ui-component-hamburger').forEach(Hamburger);

export default Hamburger;