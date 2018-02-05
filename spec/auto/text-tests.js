import { document, global } from '../../src/utils/ui-component-base.js';

export default () => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-text></ui-text>';
      let text = div.querySelector('ui-text');
      return text.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let text = document.createElement('ui-text');
      div.appendChild(text);
      return text.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should take any initial text content as view-text', done => {
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

    it('should have it\'s content changed via the view-text property/attr *and* textContent', done => {
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

    it('should be able to data-bind to a ui-component parent\'s attributes', done => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-checkbox></ui-checkbox>';
      let checkbox = div.querySelector('ui-checkbox');
      return checkbox.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let checkbox = document.createElement('ui-checkbox');
      div.appendChild(checkbox);
      return checkbox.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should have a checked property that reflects checked status', done => {
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

    it('should have a boolean value property to indicate checked status', done => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-button></ui-button>';
      let button = div.querySelector('ui-button');
      return button.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-fab></ui-fab>';
      let fab = div.querySelector('ui-fab');
      return fab.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let fab = document.createElement('ui-fab');
      div.appendChild(fab);
      return fab.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be floating', done => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-hamburger></ui-hamburger>';
      let hamburger = div.querySelector('ui-hamburger');
      return hamburger.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let hamburger = document.createElement('ui-hamburger');
      div.appendChild(hamburger);
      return hamburger.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should change color in response to the line-color property/attribute', done => {
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
};
