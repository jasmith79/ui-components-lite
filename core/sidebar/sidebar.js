/*
 * sidebar.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component sidebar.
 * @depends core/modal/modal.js
 */

import { CoreElementMixin } from 'core';
import { Backdrop } from 'modal';

const SidebarMixin = {

  // If you dynamically alter the attributes of the element, be sure to re-initialize afterwards.
  // Avoiding the DOMMutationObserver here.
  initialize () {
    if (this.getAttribute('modal') != null && !this._backdrop) {
      this._backdrop = Backdrop();
      this._backdrop._parentUIComponent = this;
      this._backdrop.style.zIndex = 5000;
      if (this.getAttribute('dismiss') != null)
        this._backdrop.addEventListener('click', evt => this.close());
      document.body.appendChild(this._backdrop);
    }

    this.classList.add(this.getAttribute('right') == null ?
      'ui-component-sidebar-left' :
      'ui-component-sidebar-right'
    );

    let trigger = document.querySelector('[ui-role="menu-button"]');
    if (trigger) {
      trigger.addEventListener('click', evt => this.open());
      this._trigger = trigger;
    }

    return this.wrapContent();
  },

  open () {
    if (this._backdrop) this._backdrop.show();
    this.classList.remove('sidebar-animation-out');
    this.classList.add('sidebar-animation-in');
    return this;
  },

  close () {
    this.classList.remove('sidebar-animation-in');
    this.classList.add('sidebar-animation-out');
    if (this._backdrop) this._backdrop.hide();
    return this;
  }
};

const Sidebar = function Sidebar(el=document.createElement('div')) {
  el.classList.add('ui-component-sidebar');
  Object.assign(el, CoreElementMixin, SidebarMixin);
  return el.initialize();
};

// intialize all Sidebars present in the DOM
document.querySelectorAll('.ui-component-sidebar').forEach(Sidebar);

export default Sidebar;