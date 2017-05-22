/*
 * tab.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component tab.
 */

import { CoreElementMixin } from 'core';

const Tab = function Tab(el=document.createElement('div')) {
  el.classList.add('ui-component-tab');
  el.classList.add('ui-component-ripple');
  el.addEventListener('ui-component-select', evt => {
    let parent = el._parentUIComponent;
    if (parent && parent.select && parent.unselectAll) {
      parent.unselectAll(el);
      parent.select(el);
    }
  });
  return Object.assign(el, CoreElementMixin).wrapContent().centerContent({text: true});
};

// Initialize any tabs in the DOM
document.querySelectorAll('.ui-component-tab').forEach(Tab);

export default Tab;