/*
 * select.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component-select
 */

import List from 'list';
import { CoreElementMixin, extractType } from 'core';

const SelectMixin = {
  // Overrides the List version
  select (opt) {
    if (extractType(opt) === 'Number') {
      let option = this.options[opt];
      if (option) {
        this.options.forEach(o => {
          o.removeAttribute('selected');
        });
        option.setAttribute('selected', true);
        this.selected = option;
      }

      return this.close();
    } else {
      return this.select(this.options.indexOf(opt));
    }
  },

  open () {
    this.removeAttribute('collapsed')
    return this;
  },

  close () {
    this.setAttribute('collapsed', true);
    return this;
  },

  selected: null
};

const Select = function Select(el=document.createElement('div')) {
  el.classList.add('ui-component-select');
  el.options = Array.from(el.querySelectorAll('.ui-component-option'));
  el.options.forEach((x, i) => {
    x.classList.add('ui-component-list-item');
    let arrow = document.createElement('div');
    arrow.classList.add('ui-component-down-arrow');
    x.appendChild(arrow);
    x.addEventListener('click', e => {
      if (!el.getAttribute('collapsed')) {
        el.select(i);
        setTimeout(_ => { el.close() }, 500);
      }
    });
  });

  let pendingClose = null;
  el.addEventListener('click', () => el.open());
  el.addEventListener('mouseleave', () => pendingClose = setTimeout(() => { el.close(); }, 700));
  el.addEventListener('mouseenter', () => clearTimeout(pendingClose));

  Object.assign(List(el), SelectMixin);
  if (!el.selected) el.select(0);
  return el;
};

document.querySelectorAll('.ui-component-select').forEach(Select);

Select.fromArray = ls => {

};

export default Select