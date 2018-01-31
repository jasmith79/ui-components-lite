import { toCamelCase, toSnakeCase } from '../../node_modules/jsstring/src/jsstring.js';

const global = new Function('return this')();
const document = global.document;
const baseClass = global.HTMLElement;
const registry = {};

const toPropertyObj = propList => {
  return propList.reduce((acc, prop) => {
    const property = toCamelCase(prop);
    acc[property] = {
      get: function() {
        return this[`_${property}`];
      },
      set: function(val) {
        this[`_${property}`] = val;
        this.attr(toSnakeCase(property, '-'), val);
      }
    };
    return acc;
  }, {});
};

const defineUIComponent = ({
  name,
  definition,
  reflectedAttrs=[],
  template,
  registerElement=true,
  isShadowHost,
}) => {
  if (!name) throw new Error('ui-components must have a name.');
  if (!definition) throw new Error('ui-components must have a defining class');
  if (name in registry) throw new Error(`ui-component named ${name} already registered.`);

  let tmpl = null;
  if (definition._template || template) tmpl = document.createElement('template');
  if (definition._template) tmpl.innerHTML += definition._template.innerHTML;
  if (template) tmpl.innerHTML += template.innerHTML;

  const class_ = class extends definition {
    static get observedAttributes () {
      return [...super.observedAttributes, ...reflectedAttrs];
    }

    static get _template () {
      return tmpl;
    }

    _stamp () {
      // no call to super
      let temp = tmpl ? tmpl.cloneNode(true) : null;
      if (temp && global._usingShady) global.ShadyCSS.prepareTemplate(temp, name);
      return temp;
    }

    get _reflectedAttrs () {
      let rfs = super._reflectedAttrs || [];
      return [...rfs, ...reflectedAttrs];
    }

    init () {
      super.init();
      this.classList.add(name);
      this._beforeReady(_ => {
        if (global._usingShady && this.shadowRoot && this.selectInternalElement('style')) {
          ShadyCSS.styleElement(this);
        }
      });
    }
  };

  // Override with original name for debugging/reflection.
  Object.defineProperty(class_, 'name', {
    get: () => this.name
  });

  // Set up the autogenerated getters/setters for reflected attributes. If you want additional
  // actions to occur when these are set, use a handler for the 'attribute-change' event or the
  // watchAttribute shorthand method.
  Object.defineProperties(class_.prototype, toPropertyObj(reflectedAttrs));

  if (registerElement) {
    global.customElements.define(name, class_);
    registry[name] = class_;
  }

  return class_;
};

export {
  document,
  baseClass,
  defineUIComponent,
  global,
};
