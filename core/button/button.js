/*
 * button.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component button.
 */

import { CoreElementMixin } from 'core';

const Button = function Button(el=document.createElement('div')) {
  el.classList.add('ui-component-button');
  el.classList.add('ui-component-ripple');
  return Object.assign(el, CoreElementMixin).wrapContent().centerContent({text: true});
};

// Initialize all the buttons in the DOM
document.querySelectorAll('.ui-component-button').forEach(Button);

export default Button;