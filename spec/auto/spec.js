/*
 * spec.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * automated tests for ui-components-lite.
 */

import {
  document,
  global,
  defineUIComponent,
  UIBase
} from '../../src/utils/ui-component-base.js';
import Fab from '../../src/elements/fab.js';
import Hamburger from '../../src/elements/hamburger.js';
import Alert from '../../src/elements/alert.js';
import Drawer from '../../src/elements/drawer.js';
import Toolbar from '../../src/elements/toolbar.js';
import {
  Tabs,
  Tab
} from '../../src/elements/tabs.js';
import Text from '../../src/elements/text.js';
import {
  Input,
  DATE_TYPE_SUPPORTED,
  TIME_TYPE_SUPPORTED
} from '../../src/elements/input.js';
import Dropdown from '../../src/elements/drop-down.js';
import Login from '../../src/elements/login.js';
import {
  Router
} from '../../src/elements/router.js';
import extractType from '../../../extracttype/extracttype.js';

const reflectedAttributes = ['foo-bar'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>
`;

const FooX = defineUIComponent({
  name: 'foo-x',
  template,
  reflectedAttributes,
  definition: class FooX extends UIBase {},
});

Promise.all([
  customElements.whenDefined('ui-fab'),
  customElements.whenDefined('ui-hamburger'),
  customElements.whenDefined('ui-alert'),
  customElements.whenDefined('ui-drawer'),
  customElements.whenDefined('ui-toolbar'),
  customElements.whenDefined('ui-tab'),
  customElements.whenDefined('ui-text'),
  customElements.whenDefined('ui-input'),
  customElements.whenDefined('ui-drop-down'),
  customElements.whenDefined('ui-login'),
  customElements.whenDefined('ui-router'),
  customElements.whenDefined('foo-x'),
]).then(() => {
  describe('defineUIComponent', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be constructable via innerHTML', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        expect(true).toBe(true);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be constructable via document.createElement', done => {
      let foo = document.createElement('foo-x');
      foo.onReady(_ => {
        expect(true).toBe(true);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
      div.appendChild(foo);
    });


    xit('should reflect reflectedAttributes to a JavaScript object property', done => {
      div.innerHTML = '<foo-x foo-bar="baz"></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        expect(foo.fooBar).toBe('baz');
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should reflect reflected JavaScript object properties to an HTML attribute', done => {
      div.innerHTML = '<foo-x foo-bar="baz"></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        foo.fooBar = 'qux';
        setTimeout(() => {
          expect(foo.attr('foo-bar')).toBe('qux');
          done();
        }, 0);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should reflect reflectedAttributes the correct JavaScript type', done => {
      div.innerHTML = '<foo-x foo-bar="3"></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        expect(foo.attr('foo-bar')).toBe(3);
        expect(extractType(foo.attr('foo-bar'))).toBe('Number');
        foo.attr('foo-bar', 'NaN');
        expect(Number.isNaN(foo.attr('foo-bar'))).toBe(true);
        expect(extractType(foo.attr('foo-bar'))).toBe('Number');
        foo.attr('foo-bar', true);
        expect(foo.attr('foo-bar')).toBe(true);
        expect(extractType(foo.attr('foo-bar'))).toBe('Boolean');
        foo.attr('foo-bar', false);
        expect(foo.attr('foo-bar')).toBe(false);
        expect(extractType(foo.attr('foo-bar'))).toBe('Boolean');
        foo.attr('foo-bar', null);
        expect(foo.attr('foo-bar')).toBe(null);
        expect(extractType(foo.attr('foo-bar'))).toBe('Null');
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should reflect missing attribute as null', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        expect(foo.fooBar).toBeNull();
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('selectAll method should return array of all children matching a selector', done => {
      div.innerHTML = '<foo-x><div class="find-me"></div><div class="find-me"></div></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let arr = foo.selectAll('.find-me');
        expect(Array.isArray(arr)).toBe(true);
        expect(arr.length).toBe(2);
        expect(arr.every(x => extractType(x) === 'HTMLDivElement')).toBe(true);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('isVisible property should reflect visibility', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        expect(foo.isVisible).toBe(true);
        foo.style.opacity = '0';
        expect(foo.isVisible).toBe(false);
        foo.style.opacity = '';
        expect(foo.isVisible).toBe(true);
        foo.style.visibility = 'hidden';
        expect(foo.isVisible).toBe(false);
        foo.style.visibility = '';
        expect(foo.isVisible).toBe(true);
        foo.style.display = 'none';
        expect(foo.isVisible).toBe(false);
        foo.style.display = '';
        expect(foo.isVisible).toBe(true);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('selectInternalElement method should select a child of the element\'s shadowRoot', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.shadowRoot.innerHTML += '<div class="find-me"></div>';
      foo.onReady(_ => {
        let d = foo.selectInternalElement('.find-me');
        expect(d).not.toBeNull();
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('selectInternalAll method should be same as selectAll but for shadowRoot', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.shadowRoot.innerHTML += '<div class="find-me"></div><div class="find-me"></div>';
      foo.onReady(_ => {
        let arr = foo.selectInternalAll('.find-me');
        expect(Array.isArray(arr)).toBe(true);
        expect(arr.length).toBe(2);
        expect(arr.every(x => extractType(x) === 'HTMLDivElement')).toBe(true);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('identity property should return the tagName, id, and css class selectors joined', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        expect(foo.identity).toBe('foo-x.is-ui-component');
        foo.id = 'foo';
        foo.classList.add('bar');
        foo.classList.add('baz');
        expect(foo.identity).toBe('foo-x#foo.is-ui-component.bar.baz');
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('isUIComponent property should be true', () => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      expect(foo.isUIComponent).toBe(true);
    });

    xit('on method should allow attaching event handlers', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        foo.on('click', e => {
          expect(true).toBe(true);
          done();
        });
        foo.click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('on method should autoremove and reattach handlers', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let counter = 0;
        foo.on('click', e => {
          counter++;
        });
        foo.click();
        div.removeChild(foo);
        foo.click();
        expect(counter).toBe(1);
        div.appendChild(foo);
        foo.click();
        expect(counter).toBe(2);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('on method should handle a space-delimited list of multiple events', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let counter = 0;
        foo.on('click keydown', e => {
          counter++;
        });
        foo.click();
        foo.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'enter'
        }));
        expect(counter).toBe(2);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('on method should not register the same handler more than once', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let counter = 0;
        let listener = e => counter++;
        foo.on('click', listener);
        foo.on('click', listener);
        foo.click();
        expect(counter).toBe(1);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('remove method no args removes this from parent', () => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.remove();
      expect(div.querySelector('foo-x')).toBeNull();
    });

    xit('remove method node arguments removes that child from this', done => {
      div.innerHTML = '<foo-x><div class="find-me"></div></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let found = foo.querySelector('.find-me');
        foo.remove(found);
        expect(foo.querySelector('.find-me')).toBeNull();
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('remove method multiple node args removes them all from this', done => {
      div.innerHTML = '<foo-x><div class="find-me"></div><div class="find-me"></div></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let found = foo.selectAll('.find-me');
        expect(found.length).toBe(2);
        foo.remove(...found);
        expect(foo.querySelector('.find-me')).toBeNull();
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('remove method function argument removes that listener from all events', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let counter = 0;
        let listener = e => counter++;
        foo.on('click keydown', listener);
        foo.click();
        foo.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'enter'
        }));
        expect(counter).toBe(2);
        foo.remove(listener);
        foo.click();
        foo.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'enter'
        }));
        expect(counter).toBe(2);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('remove method event, listener removes that listener for that event only', done => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.onReady(_ => {
        let counter = 0;
        let listener = e => counter++;
        foo.on('click keydown', listener);
        foo.click();
        foo.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'enter'
        }));
        expect(counter).toBe(2);
        foo.remove('click', listener);
        foo.click();
        foo.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'enter'
        }));
        expect(counter).toBe(3);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('appendFirst method appends the node before the first child', done => {
      let arr = [],
        a, b;
      div.innerHTML = '<foo-x><div class="find-me"></div></foo-x>';
      let foo = div.querySelector('foo-x');
      arr.push(foo.onReady(_ => {
        a = document.createElement('div');
        foo.appendFirst(a);
      }));

      div.innerHTML += '<foo-x id="bar"></foo-x>';
      let bar = div.querySelector('#bar');
      arr.push(bar.onReady(() => {
        b = document.createElement('div');
        bar.appendFirst(b);
      }));

      Promise.all(arr).then(_ => {
        expect(foo.children[0]).toEqual(a);
        expect(bar.children[0]).toEqual(b);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should support 1-way data-binding to attribute of a UIComponent parent.', done => {
      div.innerHTML = '<foo-x id="foo" foo-bar="3"><foo-x id="bar" foo-bar="{{foo-bar}}"></foo-x></foo-x>';
      let foo = div.querySelector('#foo');
      let bar = div.querySelector('#bar');
      Promise.all([foo._isReady, bar._isReady]).then(_ => {
        expect(bar.attr('foo-bar')).toBe(3);
        foo.fooBar = 4;
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(4);
        bar.fooBar = 5; // shouldn't be able to set, triggers console warning and fails
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(4);
        foo.fooBar = 3;
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(3);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should support 2-way data-binding of attributes to a UIComponent parent.', done => {
      div.innerHTML = '<foo-x id="foo" foo-bar="3"><foo-x id="bar" foo-bar="{{{foo-bar}}}"></foo-x></foo-x>';
      let foo = div.querySelector('#foo');
      let bar = div.querySelector('#bar');
      Promise.all([foo._isReady, bar._isReady]).then(_ => {
        expect(bar.attr('foo-bar')).toBe(3);
        foo.fooBar = 4;
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(4);
        bar.fooBar = 5;
      }).then(_ => {
        expect(foo.attr('foo-bar')).toBe(5);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should allow imperative as well as declarative 1-way binding', done => {
      div.innerHTML = '<foo-x id="foo" foo-bar="3"><foo-x id="bar"></foo-x></foo-x>';
      let foo = div.querySelector('#foo');
      let bar = div.querySelector('#bar');
      Promise.all([foo._isReady, bar._isReady]).then(_ => {
        bar.bindAttribute('foo-bar', 'foo-bar');
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(3);
        foo.fooBar = 4;
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(4);
        bar.fooBar = 5; // shouldn't be able to set, triggers console warning and fails
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(4);
        foo.fooBar = 3;
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(3);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should support 2-way data-binding of attributes to a UIComponent parent.', done => {
      div.innerHTML = '<foo-x id="foo" foo-bar="3"><foo-x id="bar"></foo-x></foo-x>';
      let foo = div.querySelector('#foo');
      let bar = div.querySelector('#bar');
      Promise.all([foo._isReady, bar._isReady]).then(_ => {
        bar.bindAttribute('foo-bar', 'foo-bar', true);
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(3);
        foo.fooBar = 4;
      }).then(_ => {
        expect(bar.attr('foo-bar')).toBe(4);
        bar.fooBar = 5;
      }).then(_ => {
        expect(foo.attr('foo-bar')).toBe(5);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    // may change this in the future
    xit('should throw when attempting to data-bind non-UI parent', done => {
      div.innerHTML = '<div id ="foo"><foo-x id="bar"></foo-x></div>';
      let foo = div.querySelector('#foo');
      let bar = div.querySelector('#bar');
      expect(() => {
        bar.bindAttribute('foo-bar', 'foo-bar');
        done();
      }).toThrow();
      done();
    });
  });

  describe('ui-card', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-card></ui-card>';
      let card = div.querySelector('ui-card');
      return card.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let card = document.createElement('ui-card');
      div.appendChild(card);
      return card.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-text', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-text></ui-text>';
      let text = div.querySelector('ui-text');
      return text.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let text = document.createElement('ui-text');
      div.appendChild(text);
      return text.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should take any initial text content as view-text', done => {
      div.innerHTML = '<ui-text>foo</ui-text>';
      let text = div.querySelector('ui-text');
      return text.onReady(_ => {
        expect(text.selectInternalElement('span').textContent.trim()).toBe('foo');
        expect(text.viewText).toBe('foo');
        expect(text.attr('view-text')).toBe('foo');
        expect(text.textContent).toBe('foo');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should have it\'s content changed via the view-text property/attr *and* textContent', done => {
      div.innerHTML = '<ui-text></ui-text>';
      let text = div.querySelector('ui-text');
      return text.onReady(_ => {
        text.viewText = 'foo';
        expect(text.selectInternalElement('span').textContent.trim()).toBe('foo');
        expect(text.viewText).toBe('foo');
        expect(text.textContent).toBe('foo');
        expect(text.attr('view-text')).toBe('foo');

        text.attr('view-text', 'bar');
        expect(text.selectInternalElement('span').textContent.trim()).toBe('bar');
        expect(text.viewText).toBe('bar');
        expect(text.textContent).toBe('bar');
        expect(text.attr('view-text')).toBe('bar');

        text.textContent = 'baz';
        expect(text.selectInternalElement('span').textContent.trim()).toBe('baz');
        expect(text.viewText).toBe('baz');
        expect(text.textContent).toBe('baz');
        expect(text.attr('view-text')).toBe('baz');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to data-bind to a ui-component parent\'s attributes', done => {
      div.innerHTML = '<ui-card foo="bar"><ui-text view-text="{{foo}}"></ui-text></ui-card>';
      let text = div.querySelector('ui-text');
      let card = div.querySelector('ui-card');
      Promise.all([text._isReady, card._isReady]).then(_ => {
        expect(text.selectInternalElement('span').textContent.trim()).toBe('bar');
        expect(text.viewText).toBe('bar');
        expect(text.textContent).toBe('bar');
        expect(text.attr('view-text')).toBe('bar');

        card.attr('foo', 'baz');
        setTimeout(() => { // let the MutationObserver and callbacks fire TODO: get this synchronous?
          expect(text.selectInternalElement('span').textContent.trim()).toBe('baz');
          expect(text.viewText).toBe('baz');
          expect(text.textContent).toBe('baz');
          expect(text.attr('view-text')).toBe('baz');
          done();
        }, 0);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-checkbox', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-checkbox></ui-checkbox>';
      let checkbox = div.querySelector('ui-checkbox');
      return checkbox.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let checkbox = document.createElement('ui-checkbox');
      div.appendChild(checkbox);
      return checkbox.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should have a checked property that reflects checked status', done => {
      div.innerHTML = '<ui-checkbox></ui-checkbox>';
      let checkbox = div.querySelector('ui-checkbox');
      return checkbox.onReady(_ => {
        expect(!checkbox.checked).toBe(true);
        checkbox.click();
        setTimeout(() => {
          expect(checkbox.checked).toBe(true);
          done();
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should have a boolean value property to indicate checked status', done => {
      div.innerHTML = '<ui-checkbox></ui-checkbox>';
      let checkbox = div.querySelector('ui-checkbox');
      return checkbox.onReady(_ => {
        expect(checkbox.value).toBe(false);
        checkbox.click();
        setTimeout(() => {
          expect(checkbox.value).toBe(true);
          done();
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-button', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-button></ui-button>';
      let button = div.querySelector('ui-button');
      return button.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let button = document.createElement('ui-button');
      div.appendChild(button);
      return button.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-fab', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-fab></ui-fab>';
      let fab = div.querySelector('ui-fab');
      return fab.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let fab = document.createElement('ui-fab');
      div.appendChild(fab);
      return fab.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be floating', done => {
      div.innerHTML = '<ui-fab></ui-fab>';
      let fab = div.querySelector('ui-fab');
      return fab.onReady(_ => {
        expect(fab.floatingY).toBe(true);
        let boxShadow = window.getComputedStyle(fab).boxShadow;
        expect(Boolean(boxShadow)).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-hamburger', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-hamburger></ui-hamburger>';
      let hamburger = div.querySelector('ui-hamburger');
      return hamburger.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let hamburger = document.createElement('ui-hamburger');
      div.appendChild(hamburger);
      return hamburger.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should change color in response to the line-color property/attribute', done => {
      div.innerHTML = '<ui-hamburger line-color="blue"></ui-hamburger>';
      let hamburger = div.querySelector('ui-hamburger');
      return hamburger.onReady(_ => {
        expect(window.getComputedStyle(hamburger.selectInternalElement('.line')).backgroundColor)
          .toBe('rgb(0, 0, 255)');

        hamburger.lineColor = 'red';
        expect(window.getComputedStyle(hamburger.selectInternalElement('.line')).backgroundColor)
          .toBe('rgb(255, 0, 0)');

        hamburger.attr('line-color', 'purple');
        expect(window.getComputedStyle(hamburger.selectInternalElement('.line')).backgroundColor)
          .toBe('rgb(128, 0, 128)');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-dialog', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-dialog></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let dialog = document.createElement('ui-dialog');
      div.appendChild(dialog);
      return dialog.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('emit an event on opening', done => {
      div.innerHTML = '<ui-dialog></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        let flag = false;
        dialog.on('dialog-opened', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 10);

        dialog.open();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('emit an event on closing', done => {
      div.innerHTML = '<ui-dialog></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        let flag = false;
        dialog.on('dialog-closed', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 10);

        dialog.open();
        dialog.close();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should respond to a confirmer, including emitting an appropiate event', done => {
      div.innerHTML = '<ui-dialog><ui-button dialog-confirm>Confirm</ui-button></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        let flag = false;
        dialog.on('dialog-confirm', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 505); // need to wait for ripple animation on button

        dialog.open();
        dialog.querySelector('ui-button').click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should respond to a dismisser, including emitting an appropiate event', done => {
      div.innerHTML = '<ui-dialog><ui-button dialog-dismiss>Confirm</ui-button></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        let flag = false;
        dialog.on('dialog-dismiss', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 505); // need to wait for ripple animation on button

        dialog.open();
        dialog.querySelector('ui-button').click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be modal if specified', done => {
      div.innerHTML = '<ui-dialog is-modal></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        let flag = false;
        expect(dialog.isModal).toBe(true);
        dialog.open();
        dialog.on('dialog-closed', e => {
          flag = true;
          done();
        });

        setTimeout(() => {
          dialog._backdrop.click();
        }, 505);

        setTimeout(() => {
          if (!flag) throw new Error('modal fail.');
        }, 1100);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-alert', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let alert = document.createElement('ui-alert');
      div.appendChild(alert);
      return alert.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('emit an event on opening', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-opened', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 10);

        alert.open();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('emit an event on closing', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-closed', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 10);

        alert.open();
        alert.close();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should respond to a confirmer, including emitting an appropiate event', done => {
      div.innerHTML = '<ui-alert><ui-button dialog-confirm>Confirm</ui-button></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-confirm', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 505); // need to wait for ripple animation on button

        alert.open();
        alert.querySelector('ui-button').click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should respond to a dismisser, including emitting an appropiate event', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-dismiss', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 700);

        alert.open();
        alert.selectInternalElement('ui-button').click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be modal', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        expect(alert.isModal).toBe(true);
        alert.open();
        alert.on('dialog-closed', e => {
          flag = true;
          done();
        });

        setTimeout(() => {
          alert._backdrop.click();
        }, 550);

        setTimeout(() => {
          if (!flag) throw new Error('modal fail.');
        }, 1200);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should have an alert method that opens the dialog and sets content appropriately', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        alert.alert('foobar');
        setTimeout(() => {
          expect(alert.isOpen).toBe(true);
          expect(alert.textContent).toBe('foobar');
          done();
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should have the closer focused on open', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-dismiss', e => {
          flag = true;
          done();
        });

        alert.alert('foobar');
        setTimeout(() => {
          expect(alert.isOpen).toBe(true);
          alert.shadowRoot.activeElement.click();
          setTimeout(() => {
            if (!flag) throw new Error('closer not focused');
          }, 600);
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-drawer', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-drawer></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      return drawer.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let drawer = document.createElement('ui-drawer');
      div.appendChild(drawer);
      return drawer.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be toggled by an appropriate element already in DOM', done => {
      div.innerHTML = '<ui-hamburger drawer-toggle></ui-hamburger><ui-drawer></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      let hamburger = div.querySelector('ui-hamburger');
      return drawer.onReady(_ => {
        hamburger.click();
        setTimeout(() => {
          expect(drawer.isOpen).toBe(true);
          done();
        }, 505); // slide animation, ripple on button
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should emit appropriate events', done => {
      div.innerHTML = '<ui-drawer></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      return drawer.onReady(_ => {
        let counter = 0;
        drawer.on('drawer-opened', e => {
          counter++;
        });

        drawer.on('drawer-closed', e => {
          counter++;
          expect(counter).toBe(2);
          done();
        });

        drawer.open();
        drawer.close();

        setTimeout(() => {
          if (!counter) {
            throw new Error('event did not fire');
          }
        }, 1100);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be modal if specified', done => {
      div.innerHTML = '<ui-drawer is-modal></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      return drawer.onReady(_ => {
        let flag = false;
        expect(drawer.isModal).toBe(true);
        drawer.open();
        drawer.on('drawer-closed', e => {
          flag = true;
          done();
        });

        setTimeout(() => {
          drawer._backdrop.click();
        }, 505);

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 1100);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-toolbar', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-toolbar></ui-toolbar>';
      let toolbar = div.querySelector('ui-toolbar');
      return toolbar.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let toolbar = document.createElement('ui-toolbar');
      div.appendChild(toolbar);
      return toolbar.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-tab', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-tab></ui-tab>';
      let tab = div.querySelector('ui-tab');
      return tab.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let tab = document.createElement('ui-tab');
      div.appendChild(tab);
      return tab.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-tabs', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-tabs></ui-tabs>';
      let tabs = div.querySelector('ui-tabs');
      return tabs.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let tabs = document.createElement('ui-tabs');
      div.appendChild(tabs);
      return tabs.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-input', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-input></ui-input>';
      let ip = div.querySelector('ui-input');
      return ip.onReady(_ => {
        ip.value = 'pizza';
        // I know, I know, testing implementation details is bad, but warranted here.
        let value = ip.selectInternalElement('input').value;
        expect(value).toBe('pizza');
        expect(ip.attr('value')).toBe('pizza');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let ip = document.createElement('ui-input');
      div.appendChild(ip);
      return ip.onReady(_ => {
        ip.value = 'pizza';
        // I know, I know, testing implementation details is bad, but warranted here.
        let value = ip.selectInternalElement('input').value;
        expect(value).toBe('pizza');
        expect(ip.attr('value')).toBe('pizza');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should support a default value', done => {
      let ip = document.createElement('ui-input');
      ip.attr('placeholder', 'barfoo');
      ip.onReady(_ => {
        let val = ip.selectInternalElement('input').value;
        ip.attr('default-value', 'foobar');
        val = ip.selectInternalElement('input').value;
        expect(val).toBe('foobar');

        ip.value = '5';
        ip.value = null;

        val = ip.selectInternalElement('input').value;
        expect(val).toBe('foobar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    xit('should fire change event exactly once on value changes', done => {
      let ip = document.createElement('ui-input');
      let count = 0;
      let listen = e => ++count;
      ip.onReady(_ => {
        ip.on('change', listen);
        ip.value = '3';
        ip.remove(listen);
        expect(count).toBe(1);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });
  });

  describe('ui-input:date', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should work for innerHTML', done => {
      div.innerHTML = '<ui-input type="date" id="date-1"></ui-input>';
      let date1 = div.querySelector('#date-1');
      date1.onReady(_ => {
        let test = new Date(2017, 0, 1);
        date1.value = test;
        expect(date1.value.getTime()).toBe(test.getTime());
        expect(date1.classList.contains('empty')).toBe(false);

        date1.value = '2015-02-10';
        expect(date1.value.getTime()).toBe(new Date(2015, 1, 10).getTime());

        date1.value = null;
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);

        date1.value = new Date(2014, 3, 1).toISOString();
        expect(date1.value.getTime()).toBe(new Date(2014, 3, 1).getTime());

        date1.value = new Date('foo');
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should work for appendChild', done => {
      div.innerHTML = '<ui-input type="date" id="date-1"></ui-input>';
      let date1 = div.querySelector('#date-1');
      date1.onReady(_ => {
        let test = new Date(2017, 0, 1);
        date1.value = test;
        expect(date1.value.getTime()).toBe(test.getTime());
        expect(date1.classList.contains('empty')).toBe(false);

        date1.value = '2015-02-10';
        expect(date1.value.getTime()).toBe(new Date(2015, 1, 10).getTime());

        date1.value = null;
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);

        date1.value = new Date(2014, 3, 1).toISOString();
        expect(date1.value.getTime()).toBe(new Date(2014, 3, 1).getTime());

        date1.value = new Date('foo');
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-drop-down', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = `
        <ui-drop-down id="ddinnerhtml">
          <ui-item id="item-1">Foo</ui-item>
          <ui-item id="item-2" value="passed" is-selected>Bar</ui-item>
        </ui-drop-down>
      `;

      let dd = document.querySelector('#ddinnerhtml');

      return dd.onReady(_ => {
        expect(dd.value).toBe('passed');
        expect(dd.textContent.trim()).toBe('Bar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let dd = document.createElement('ui-drop-down');
      dd.id = 'createElement';

      let item1 = document.createElement('ui-item');
      item1.textContent = 'Foo';
      item1.id = 'item-3';

      let item2 = document.createElement('ui-item');
      item2.textContent = 'Bar';
      item2.value = 'passed';
      item2.setAttribute('is-selected', true);
      item2.id = 'item-4';

      dd.appendChild(item1);
      dd.appendChild(item2);
      div.appendChild(dd);
      dd.onReady(_ => {
        expect(dd.value).toBe('passed');
        expect(dd.textContent.trim()).toBe('Bar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should fire change event exactly once on value changes', done => {
      let dd = document.createElement('ui-drop-down');
      let item = document.createElement('ui-item');
      dd.appendChild(item);
      item.value = '3oo';
      let count = 0;
      let listen = e => ++count;
      dd.on('change', listen);
      return dd.onReady(_ => {
        dd.selected = item;
        setTimeout(() => {
          dd.remove(listen);
          expect(count).toBe(1);
          done();
        }, 10);
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(dd);
    });
  });

  describe('ui-form', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-form></ui-form>';
      let form = div.querySelector('ui-form');
      return form.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let form = document.createElement('ui-form');
      div.appendChild(form);
      return form.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('elements property: array of all of the Form Control elements', done => {
      div.innerHTML = `
        <ui-form id="formy">
          <ui-input name="foo" value="1"></ui-input>
          <ui-drop-down name="bar">
            <ui-item selected>2</ui-item>
          </ui-drop-down>
          <ui-checkbox name="baz" checked></ui-checkbox>
          <input name="qux" value="3" type="text" />
          <select name="fii">
            <option selected>4</option>
          </select>
        </ui-form>
        <ui-input name="yo" value="5" form="formy"></ui-input>
        <ui-drop-down name="bax" form="formy">
          <ui-item selected>6</ui-item>
        </ui-drop-down>
        <ui-checkbox name="gux" form="formy" checked></ui-checkbox>
        <input name="quq" value="7" type="text" form="formy"/>
        <select name="fiy" form="formy">
          <option selected>8</option>
        </select>
      `;

      let form = div.querySelector('ui-form');
      form.onReady(_ => {
        expect(form.elements).toBeDefined();
        expect(extractType(form.elements)).toBe('Array');
        expect(form.elements.length).toBe(10);
        expect(form.elements.map(x => x.getAttribute('name')).toString())
          .toBe('foo,bar,baz,qux,fii,yo,bax,gux,quq,fiy');

        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('serialize method: returns POJO of the state of the form', done => {
      div.innerHTML = `
        <ui-form id="formy">
          <ui-input name="foo" value="1"></ui-input>
          <ui-drop-down name="bar">
            <ui-item is-selected>2</ui-item>
          </ui-drop-down>
          <ui-checkbox name="baz" checked></ui-checkbox>
          <input name="qux" value="3" type="text" />
          <select name="fii">
            <option selected>4</option>
          </select>
        </ui-form>
        <ui-input name="yo" value="5" form="formy"></ui-input>
        <ui-drop-down name="bax" form="formy">
          <ui-item is-selected>6</ui-item>
        </ui-drop-down>
        <ui-checkbox name="gux" form="formy"></ui-checkbox>
        <input name="quq" value="7" type="text" form="formy"/>
        <select name="fiy" form="formy">
          <option selected>8</option>
        </select>
      `;

      let form = div.querySelector('ui-form');
      form.onReady(_ => {
        setTimeout(() => {
          let data = form.serialize();
          expect(data).toBeDefined();
          expect(data.foo).toBe(1);
          expect(data.bar).toBe(2);
          expect(data.baz).toBe(true);
          expect(data.qux).toBe(3);
          expect(data.fii).toBe(4);
          expect(data.yo).toBe(5);
          expect(data.bax).toBe(6);
          expect(data.gux).toBe(false);
          expect(data.quq).toBe(7);
          expect(data.fiy).toBe(8);
          done();
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('data property: a FormData of the current value', done => {
      div.innerHTML = `
        <ui-form id="formy">
          <ui-input name="foo" value="1"></ui-input>
          <ui-drop-down name="bar">
            <ui-item is-selected>2</ui-item>
          </ui-drop-down>
          <ui-checkbox name="baz" checked></ui-checkbox>
          <input name="qux" value="3" type="text" />
          <select name="fii">
            <option selected>4</option>
          </select>
        </ui-form>
        <ui-input name="yo" value="5" form="formy"></ui-input>
        <ui-drop-down name="bax" form="formy">
          <ui-item is-selected>6</ui-item>
        </ui-drop-down>
        <ui-checkbox name="gux" form="formy"></ui-checkbox>
        <input name="quq" value="7" type="text" form="formy"/>
        <select name="fiy" form="formy">
          <option selected>8</option>
        </select>
      `;

      let form = div.querySelector('ui-form');
      form.onReady(_ => {
        expect(form.data instanceof FormData).toBe(true);
        expect([...form.data.entries()].toString())
          .toEqual(Object.entries(form.serialize()).toString());
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('isValid property: whether or not all of the form values are valid', done => {
      div.innerHTML = `
        <ui-form id="formy">
          <ui-input name="foo" required></ui-input>
        </ui-form>
      `;
      let form = div.querySelector('ui-form');
      form.onReady(_ => {
        expect(form.isValid).toBe(false);
        div.querySelector('ui-input').value = 3;
        expect(form.isValid).toBe(true);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('submit method: submits the form', done => {
      expect(false).toBe(true);
      done();
    });

    xit('checks cached data on load', done => {
      expect(false).toBe(true);
      done();
    });

    xit('adds query string when updates-history', done => {
      expect(false).toBe(true);
      done();
    });
  });

  describe('ui-login', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-login></ui-login>';
      let login = div.querySelector('ui-login');
      return login.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let login = document.createElement('ui-login');
      div.appendChild(login);
      return login.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('loads from session storage', done => {
      expect(false).toBe(true);
      done();
    });

    xit('logs out automatically on timeout', done => {
      expect(false).toBe(true);
      done();
    });

    xit('credentials method: returns internal form.serialize', done => {
      expect(false).toBe(true);
      done();
    });
  });

  describe('ui-router', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-router></ui-router>';
      let router = div.querySelector('ui-router');
      return router.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let router = document.createElement('ui-router');
      div.appendChild(router);
      return router.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });

  describe('ui-route', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    xit('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-route></ui-route>';
      let route = div.querySelector('ui-route');
      return route.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    xit('should be able to be appended to another element.', done => {
      let route = document.createElement('ui-route');
      div.appendChild(route);
      return route.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
});
