export default superclass => class DataBinder extends superclass {

  constructor () {
    super();
    this._oneWayBoundAttrs = {};
    this._twoWayBoundAttrs = {};
    this._internalMutationFlag = false;
  }

  // Set up data-binding. Any element attributes with a value matching the binding syntax
  // check up the DOM tree until it hits the document (in which case it throws) or finds
  // an element with a matching attribute.
  //
  // If the attribute uses the one-way syntax {{parentAttr}}, the element is updated when it's
  // parent changes, if two-way {{{parentAttr}}} then, well, it works both ways. Attempting to
  // change a one-way property logs a warning to the console and fails.
  //
  // As of right now, only works if the parent is a UIComponent. Otherwise, it log a warning
  // and no-ops.
  bindAttribute (attribute, parentAttribute, twoWay=false) {
    let parent = null;
    let node = this;
    while (node = (node.parentNode || node.host)) { // need host for shadowRoots
      if (
        (node.getAttribute && node.getAttribute(parentAttribute) != null) ||
        (
          node.constructor &&
          node.constructor.observedAttributes &&
          node.constructor.observedAttributes.includes(parentAttribute)
        )
      ) {
        parent = node;
        break;
      }
    }

    if (!parent) {
      throw new Error(`Attempted to bind attribute ${attribute} to ${parentAttribute},` +
         'but no matching parent found.');
    }

    const bind = () => {
      if (!parent.isUIComponent) {
        console.warn(`Attempted to data-bind ${parentAttribute} to non-ui-component parent.`);
        return;
      }

      // Initial set
      this.attr(attribute, parent.attr(parentAttribute));

      // Watch changes.
      this.watchAttribute(parent, parentAttribute, (now, name, was) => {
        if (this.attr(attribute) !== now) {
          this._internalMutationFlag = true;
          this.attr(attribute, now);
        }
      });

      if (twoWay) {
        this.watchAttribute(this, attribute, (now, name, was) => {
          if (parent.attr(parentAttribute) !== now) {
            parent.attr(parentAttribute, now);
          }
        });
        this._twoWayBoundAttrs[attribute] = parentAttribute;
      } else {
        this._oneWayBoundAttrs[attribute] = parentAttribute;
      }
    };

    parent.onReady(bind);
  }
};
