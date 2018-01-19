import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document } from '../utils/dom.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0,0,0,0.7);
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 10000;
    }
  </style>
`;

const Backdrop = defineUIComponent({
  name: 'ui-backdrop',
  template,
  definition: class Backdrop extends UIBase {
    constructor () {
      super();

       // Elements that use this element should set this property to themselves as a
       // debugging aid.
      this.for = null;
    }

    init () {
      super.init();
      this.hide();
    }
  }
});

export default Backdrop;
