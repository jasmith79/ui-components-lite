/*
 * fab.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component floating action button.
 */

import { CoreElementMixin } from 'core';

const FabMixin = {
  initialize () {
    if (this.getAttribute('small') != null) {
      this.classList.add('ui-component-fab-small');
    } else {
      this.classList.add('ui-component-fab-large');
    }
    return this.wrapContent().centerContent({text: true});
  }
};

const Fab = function Fab(el=document.createElement('div')) {
  el.classList.add('ui-component-fab');
  el.classList.add('ui-component-ripple');
  return Object.assign(el, CoreElementMixin, FabMixin).initialize();
};

// Initialize all the buttons in the DOM
document.querySelectorAll('.ui-component-fab').forEach(Fab);

export default Fab;