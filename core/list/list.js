/*
 * list.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component-list
 */

import { CoreElementMixin, extractType } from 'core';

const ListMixin = {
  // lists are multi-select by default
  select (item) {
    if (extractType(item) === 'Number') {
      let elem = this.items[item];
      if (extractType(elem.select) === 'Function') elem.select();
      elem.setAttribute('selected', true);
      return this;
    } else {
      return this.select(this.items.indexOf(item));
    }
  },

  unselect (item) {
    if (extractType(item) === 'Number') {
      let elem = this.items[item];
      if (extractType(elem.unselect) === 'Function') elem.unselect();
      elem.removeAttribute('selected');
      return this;
    } else {
      return this.unselect(this.items.indexOf(item));
    }
  },

  unselectAll () {
    this.items.map(this.unselect.bind(this));
    return this;
  },

  sort (f) {
    this.items
      .map(el => this.removeChild(el))
      .sort(f)
      .forEach(el => this.appendChild(el));

    return this;
  },

  selected: null
};

const ListItem = function ListItem(el=document.createElement('div')) {
  el.classList.add('ui-component-list-item');
  return Object.assign(el, CoreElementMixin);
};

const List = function List(el=document.createElement('div')) {
  el.classList.add('ui-component-list');
  el.items = Array.from(el.querySelectorAll('.ui-component-list-item')).map(ListItem);
  return Object.assign(el, CoreElementMixin, ListMixin);
};

document.querySelectorAll('.ui-component-list').forEach(List);

export default List;