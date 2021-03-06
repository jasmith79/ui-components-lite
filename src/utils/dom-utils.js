/*
 * dom-utils.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * DOM manipulation mixin for ui-components-lite.
 */

import * as DOM from './dom.js';
import processHTMLAttr from './attribute-analyzer.js';

import extractType from '../../../extracttype/extracttype.js';

const attrConf = { attributes: true }; // Argument to MutationObserver.prototype.observe
const isHTMLElement = arg => Boolean(extractType(arg).match(/HTML[a-zA-Z]*Element/));

export default superclass => class DOMutils extends superclass {
  constructor () {
    super();
    this._mutationObservers = [];
    this._prevDisplay = '';
    this._isHidden = false;
  }

  /*
   * isVisible :: Void -> Boolean
   */
  get isVisible () {
    const style = DOM.global.getComputedStyle(this);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }

  /*
   * watchAttribute :: HTMLElement, String, (* -> *) -> HTMLElement
   *
   * Observes changes to the given attribute on the given node.
   */
  watchAttribute (n, a, callb) {
    const [node, attr, cb] = (() => {
      if (isHTMLElement(n)) return [n, a, callb];
      return [this, n, a];
    })();

    if ((node.constructor.observedAttributes || []).includes(attr)) {
      node.on('attribute-change', ({ changed: { now, name, was } }) => {
        if (name === attr) cb(now, name, was);
      });
    } else {
      const observer = new MutationObserver(([mutation]) => {
        if (mutation.attributeName === attr) {
          cb(node.attr(mutation.attributeName), mutation.attributeName, mutation.oldValue);
        }
      });

      observer.observe(node, attrConf);
      this._mutationObservers.push([observer, node, attrConf]);
    }

    return this;
  }

  /*
   * selectAll :: CSSSelector -> [HTMLElement]
   */
  selectAll (selector) {
    const nodeList = this.querySelectorAll(selector);
    return nodeList ? [...nodeList] : [];
  }

  /*
   * matches :: CSSSelector -> Boolean
   */
  matches (selector) {
    if (super.matches) return super.matches(selector);
    if (super.msMatchesSelector) return super.msMatchesSelector(selector);
    throw new Error('HTMLElement does not implement the matches method.');
  }

  // NOTE: the following two methods violate encapsulation. Be VERY careful about using, i.e. don't
  // do it from the outside, any more than you'd use element.shadowRoot.querySelector.

  /*
   * selectInternalElement :: CSSSelector -> HTMLElement
   */
  selectInternalElement (selector) {
    if (!this.shadowRoot) {
      console.warn(`Internal selector ${selector} called on ${this.identity} which has no shadowRoot.`);
      return null;
    }
    return this.shadowRoot.querySelector(selector);
  }

  /*
   * selectInternalAll :: CSSSelector -> [HTMLElement]
   */
  selectInternalAll (selector) {
    if (!this.shadowRoot) {
      console.warn(`Internal selector ${selector} called on ${this.identity} which has no shadowRoot.`);
      return null;
    }
    return [...this.shadowRoot.querySelectorAll(selector)];
  }
  /*
   * identity :: Void -> String
   *
   * Corresponds to the representation used by chrome devtools (and most others) when inspecting an
   * element. This should generally be used more for error reporting than to try to identify
   * specific elements: if you want the element to be uniquely selectable give it an id.
   */
  get identity () {
    let id = this.id ? '#' + this.id : '';
    let tag = this.tagName.toLowerCase();
    let classes = '.' + this.attr('class').split(' ').filter(c => c !== tag).join('.');
    return `${tag}${id}${classes}`;
  }

  /**
   * on :: Event, (Event -> *) -> HTMLElement
   *
   * Registers an event listener. Listeners added via this method are
   * automatically removed and reattached on being removed from/added to the
   * DOM.
   */
  on (evts, fn) {
    evts.split(/\s+/g).forEach(evt => {
      const isDupe = this._listeners.some(([e, f]) => e === evt && fn === f);
      if (!isDupe) {
        this.addEventListener(evt, fn);
        this._listeners.push([evt, fn]);
      }
    });
    return this;
  }

  /**
   * remove :: Void -> this      -- removes this from parent
   * remove :: Node -> this      -- removes child from this
   * remove :: [Node] -> this    -- removes children from this
   * remove :: (* -> *) -> this  -- removes listener for all events from this
   * remove :: String, (* -> *) -> this -- removes listener for specified event
   *
   * Removes a child node(s) or event listener. If no event name is provided, it removes that
   * listener function for all events for which it is bound to the element. If no arguments arguments
   * provided the method removes the element from its parent element. So this method
   * responds to the above signatures and ignores all others.
   */
  remove (...args) {
    const [evt, fn, children] = (arr => {
      switch (arr.length) {
        case 0:
          this.parentElement && this.parentElement.removeChild(this);
          return [];

        case 1:
          return (([item]) => {
            const type = extractType(item);
            // leaving this as a switch in case I think of more options later
            switch (type) {
              case 'Function': return [null, item]
              default:
                if (isHTMLElement(item) || type === 'Text') return [null, null, [item]];
                return [];
            }
          })(arr);

        default:
          return (args => {
            const [first] = args;
            if (isHTMLElement(first) || extractType(first) === 'Text') {
              return [null, null, args];
            }
            return args.slice(0,2);
          })(arr);
      }
    })(args);

    if (fn && extractType(fn) === 'Function') {
      this._listeners = this._listeners.filter(([e, f]) => {
        if (f === fn && (evt === null || evt === e)) {
          this.removeEventListener(e, f);
          return false;
        }
        return true;
      });
    }

    if (children) {
      children.forEach(child => this.removeChild(child));
    }

    return this;
  }

  /*
   * hide :: Void -> HTMLElement
   */
  hide () {
    if (!this._isHidden) {
      this._prevDisplay = this.style.display;
      this._isHidden = true;
      this.style.display = 'none';
    }
    return this;
  }

  /*
   * show :: Void -> HTMLElement
   */
  show () {
    if (this._isHidden) {
      this.style.display = this._prevDisplay;
      this._isHidden = false;
    }
    return this;
  }

  /*
   * attr :: String -> *
   * attr :: String, * -> HTMLElement
   *
   * Gets/Sets the supplied attribute from this.
   */
  attr (name, value) {
    if (value === undefined) {
      return processHTMLAttr(this.getAttribute(name));
    } else {
      switch (extractType(value)) {
        case 'Null':
          this.removeAttribute(name);
          break;

        default:
          this.setAttribute(name, value);
          break;
      }
      return this;
    }
  }

  /*
   * appendFirst :: HTMLElement -> HTMLElement
   * appendFirst :: HTMLElement, Boolean -> HTMLElement
   *
   * Appends node before the first child of the HTMLElement or it's shadowRoot.
   */
  appendFirst(node, shadow) {
    const parent = shadow ? this.shadowRoot : this;
    if (!parent) {
      throw new TypeError(`Attempted to append to shadowRoot but none exists on element ${this.identity}`);
    }
    if (parent.children.length) {
      parent.insertBefore(node, parent.children[0]);
    } else {
      parent.appendChild(node);
    }

    return this;
  }
};
