import {
  document,
  global,
  defineUIComponent,
  UIBase
} from '../../src/utils/ui-component-base.js';

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

export default () => {
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

    it('should be constructable via innerHTML', done => {
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

    it('should be constructable via document.createElement', done => {
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


    it('should reflect reflectedAttributes to a JavaScript object property', done => {
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

    it('should reflect reflected JavaScript object properties to an HTML attribute', done => {
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

    it('should reflect reflectedAttributes the correct JavaScript type', done => {
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

    it('should reflect missing attribute as null', done => {
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

    it('selectAll method should return array of all children matching a selector', done => {
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

    it('isVisible property should reflect visibility', done => {
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

    it('selectInternalElement method should select a child of the element\'s shadowRoot', done => {
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

    it('selectInternalAll method should be same as selectAll but for shadowRoot', done => {
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

    it('identity property should return the tagName, id, and css class selectors joined', done => {
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

    it('isUIComponent property should be true', () => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      expect(foo.isUIComponent).toBe(true);
    });

    it('on method should allow attaching event handlers', done => {
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

    it('on method should autoremove and reattach handlers', done => {
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

    it('on method should handle a space-delimited list of multiple events', done => {
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

    it('on method should not register the same handler more than once', done => {
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

    it('remove method no args removes this from parent', () => {
      div.innerHTML = '<foo-x></foo-x>';
      let foo = div.querySelector('foo-x');
      foo.remove();
      expect(div.querySelector('foo-x')).toBeNull();
    });

    it('remove method node arguments removes that child from this', done => {
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

    it('remove method multiple node args removes them all from this', done => {
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

    it('remove method function argument removes that listener from all events', done => {
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

    it('remove method event, listener removes that listener for that event only', done => {
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

    it('appendFirst method appends the node before the first child', done => {
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

    it('should support 1-way data-binding to attribute of a UIComponent parent.', done => {
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

    it('should support 2-way data-binding of attributes to a UIComponent parent.', done => {
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

    it('should allow imperative as well as declarative 1-way binding', done => {
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

    it('should support 2-way data-binding of attributes to a UIComponent parent.', done => {
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
    it('should throw when attempting to data-bind non-UI parent', done => {
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
};
