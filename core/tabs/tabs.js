/*
 * tabs.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * Tabs manages an element with one or more ui-component-tab children. NOTE: tabs can *only* be
 * dynamically added by the method or the handling won't work correctly. Simplicity over features.
 *
 * @depends core/tab/tab.js
 */

import { CoreElementMixin, extractType } from 'core';
import Tab from 'tab';

const TabsMixin = {
  initialize () {
    if (this.getAttribute('bottom') != null) this.setToBottom();
    return this;
  },

  addTab (tb) {
    this.tabs.push(Tab(tb));
    this.appendChild(tb);
    return this;
  },

  setToBottom () {
    this.classList.add('ui-component-tabs-bottom');
    let height = window.getComputedStyle(this).height;
    this.style.bottom = '-' + height;
    return this;
  },

  setSelectedCallbacks (f, g) {
    this._selectCallback = f;
    this._unselectCallback = g;
    return this;
  },

  select (tb) {
    if (extractType(tb) === 'Number') {
      let tab = this.tabs[tb];
      if (tab) {
        this.unselectAll(tab);
        this.selectedTab = tab;
        (this._selectCallback || defaultSelectCallback).call(tab, tab);
      } else {
        this.selectedPage = null;
        console.warn('Tried to select non-existant tab.');
      }
      return this;
    } else {
      return this.select(this.tabs.indexOf(tb));
    }
  },

  unselect (tb) {
    tb.removeAttribute('selected');
    (this._unselectCallback || defaultUnselectCallback)(tb);
    return this;
  },

  unselectAll (except) {
    let tbs = except ? this.tabs.filter(tb => tb !== except) : this.tabs;
    tbs.forEach(tb => this.unselect(tb));
    this.selectedTab = except || null;
    return this;
  }
};

const defaultSelectCallback = tb => {
  tb.classList.add('ui-component-tabs-bottom-bordered');
};

const defaultUnselectCallback = tb => {
  tb.classList.remove('ui-component-tabs-bottom-bordered');
};

const Tabs = function Tabs(el=document.createElement('div')) {
  el.classList.add('ui-component-tabs');
  Object.assign(el, CoreElementMixin, TabsMixin);
  el.tabs = Array.from(el.querySelectorAll('.ui-component-tab'));
  el.tabs.forEach(tab => {
    tab.addEventListener('click', evt => {
      el.select(tab);
      let forWhat = tab.getAttribute('for');
      el.dispatchEvent(new CustomEvent('tab-change', {
        detail: {
          tab,
          forValue: forWhat
        }
      }));

      if (forWhat) {
        (document.querySelector(`#${forWhat}`) || document.querySelector(`.${forWhat}`))
          .dispatchEvent(new CustomEvent('ui-component-select'));
      }
    });

    if (tab.getAttribute('selected') != null) el.select(tab);
  });

  return el.initialize();
};

document.querySelectorAll('.ui-component-tabs').forEach(Tabs);
export default Tabs;

