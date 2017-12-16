import Styled from './styler.js';

const centered = {
  'position': 'relative',
  'top': '49%',
  'transform': 'translateY(-51%)',
};

const wrapperSlot = document.createElement('slot');
const slottedWrapperDiv = document.createElement('div');
slottedWrapperDiv.id = 'ui-component-wrapper';
slottedWrapperDiv.appendChild(wrapperSlot);

const wrapperDiv = document.createElement('div');
wrapperDiv.id = 'ui-component-wrapper';

const preserve3dStyles = {
  'transform-style': 'preserve-3d',
};

export default superclass => class Centerable extends superclass {
  centerContent ({unslotted}={}) {
    if (!this.shadowRoot || !this.shadowRoot.querySelector('#ui-component-wrapper')) {
      const wrapper = (unslotted ? wrapperDiv : slottedWrapperDiv).cloneNode(true);
      this.applyStyles(preserve3dStyles);
      const shadowRoot = this.shadowRoot || this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(wrapper);
      wrapper.classList.add(Styled.addStyles(centered, shadowRoot));
      wrapper.addEventListener('slotchange', console.log);
    }
    return this;
  }
};

export {
  centered as centeredStyles,
  preserve3dStyles,
};