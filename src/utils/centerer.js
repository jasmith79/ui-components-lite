import { document, defineUIComponent } from './dom.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      transform-style: preserve-3d;
    }

    #content-wrapper {
      position: relative;
      top: 49%;
      transform: translateY(-51%);
    }
  </style>
  <div id="content-wrapper">
    <slot></slot>
  </div>
`;

export default superclass => defineUIComponent({
  name: 'ui-centered',
  template,
  registerElement: false,
  definition: class Centered extends superclass {}
});
