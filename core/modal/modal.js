/*
 * modal.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component modal dialog and backdrop.
 */

import { CoreElementMixin } from 'core';

const specialChildrenRoles = {
  // On these two setTimeout gives ripple effect chance to complete
  'dialog-dismiss': {
    click: evt => {
      let target = evt.currentTarget;
      setTimeout(_ => {
        target._parentUIComponent.dispatchEvent(new CustomEvent('dialog-dismiss'));
        target._parentUIComponent.close();
      }, 400);
    }
  },
  'dialog-confirm': {
    click: evt => {
      let target = evt.currentTarget;
      setTimeout(_ => {
        target._parentUIComponent.dispatchEvent(new CustomEvent('dialog-confirm'));
        target._parentUIComponent.close();
      }, 400);
    }
  }
};

const ModalMixin = {
  open (cb) {
    if (cb) {
      cb(this);
    }
    this.show();
    this._backdrop.show();
    this.querySelectorAll('.ui-component-button').forEach(b => b.centerContent({text: true}));
    this.dispatchEvent(new CustomEvent('modal-opened'));
    return this;
  },

  close (cb) {
    this.hide();
    this._backdrop.hide();
    this.dispatchEvent(new CustomEvent('dialog-close'));
    if (cb) {
      cb(this);
    }
    return this;
  },

  // If you dynamically add child elements with ui-roles, be sure to call this on the dialog
  // afterwards. Avoids the need for DOMMutationObserver polyfill.
  initialize () {
    if (this.getAttribute('small') != null) this.classList.add('ui-component-modal-dialog-small');
    if (this.getAttribute('medium') != null) this.classList.add('ui-component-modal-dialog-medium');
    if (this.getAttribute('large') != null) this.classList.add('ui-component-modal-dialog-large');
    return this.initializeChildren(specialChildrenRoles);
  }
};

const AlertViewMixin = {
  setContents (html) {
    this.querySelector('.alert-view-contents').innerHTML = html;
    return this;
  }
};

const Backdrop = function Backdrop(el=document.createElement('div')) {
  el.classList.add('ui-component-modal-backdrop');
  el.classList.add('is-hidden');
  return Object.assign(el, CoreElementMixin);
};

const Dialog = function Dialog(el=document.createElement('div')) {
  el.classList.add('ui-component-modal-dialog');
  el.classList.add('is-hidden');
  el._backdrop = Backdrop();
  document.body.appendChild(el._backdrop);
  el._backdrop.addEventListener('click', evt => {
    if (el.getAttribute('dismiss') != null) {
      el.close();
    }
  });

  return Object.assign(el, CoreElementMixin, ModalMixin).initialize();
};

const AlertView = function AlertView(el=document.createElement('div')) {
  Dialog(el).setAttribute('ui-role', 'alertview');
  let textDiv = el.querySelector('.alert-view-contents');
  if (!textDiv) {
    let div = document.createElement('div');
    div.classList.add('alert-view-contents');
    el.appendChild(div);
  }

  return Object.assign(el, AlertViewMixin);
};

// initialize any Modals in the DOM
document.querySelectorAll('.ui-component-modal-backdrop').forEach(Backdrop);
document.querySelectorAll('.ui-component-modal-dialog').forEach(Dialog);
document.querySelectorAll('[ui-role="alertview"]').forEach(AlertView);

export {
  Backdrop,
  Dialog,
  AlertView
};