/*
 * header.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component header.
 */

import { CoreElementMixin, debounce } from 'core';

const HeaderMixin = {
  // If you dynamically modify the element attributes or contents, be sure to call this afterwards.
  initialize () {
    if (this.getAttribute('fixed') != null) this.classList.add('fixed');
    if (this.getAttribute('small') != null) this.classList.add('ui-component-header-small');
    if (this.getAttribute('medium') != null) this.classList.add('ui-component-header-medium');
    if (this.getAttribute('tall') != null) this.classList.add('ui-component-header-tall');
    let tabs = this.querySelector('.ui-component-tabs');
    if (tabs) this.removeChild(tabs);
    this.wrapContent().centerContent({text: true});
    if (tabs) this.appendChild(tabs);
    return this;
  }
};

const Header = function Header(el=document.createElement('div')) {
  el.classList.add('ui-component-header');
  return Object.assign(el, CoreElementMixin, HeaderMixin).initialize();
};

// Need to recenter on resize
window.addEventListener('resize', debounce(100, false, evt => {
  document.querySelectorAll('.ui-component-header').forEach(el => el.centerContent({text: true}));
}));

// Initialize all the header elements present in the DOM
document.querySelectorAll('.ui-component-header').forEach(Header);

export default Header;