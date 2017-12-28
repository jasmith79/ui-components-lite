const global = new Function('return this')();
const document = global.document;
const defineElement = (name, class_) => {
  
  global.customElements.define(name, class_);
};
