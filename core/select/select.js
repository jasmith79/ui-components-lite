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

const Option = function Option(parent, el=document.createElement('div')) {
  el.classList.add('ui-component-list-item');
  let arrow = document.createElement('div');
  arrow.classList.add('ui-component-down-arrow');
  el.appendChild(arrow);
  el.addEventListener('click', e => {
    if (!parent.getAttribute('collapsed')) {
      parent.select(i);
      setTimeout(_ => { parent.close() }, 500);
    }
  });
};

const Select = function Select(el=document.createElement('div')) {
  el.classList.add('ui-component-select');
  el.options = Array.from(el.querySelectorAll('.ui-component-option'));
  el.options.forEach(Option);

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
  let select = Select();
  select.options = ls.map(item => {
    if (extractType(item).match(/html/i)) {
      return Option(item);
    } else {
      let div = document.createElement('div');
      div.textContent = item;
      return Option(div);
    }
  });

  return select;
};

export default Select