import Fab from '../../src/elements/fab.js';
import Hamburger from '../../src/elements/hamburger.js';
import Alert from '../../src/elements/alert.js';
import Drawer from '../../src/elements/drawer.js';
import Toolbar from '../../src/elements/toolbar.js';
import { Tabs, Tab } from '../../src/elements/tabs.js';
import Text from '../../src/elements/text.js';
import { Input, DATE_TYPE_SUPPORTED, TIME_TYPE_SUPPORTED } from '../../src/elements/input.js';
import Dropdown from '../../src/elements/drop-down.js';
import Login from '../../src/elements/login.js';
import { Router } from '../../src/elements/router.js';

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
]).then(() => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-card></ui-card>';
      let card = div.querySelector('ui-card');
      return card.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let card = document.createElement('ui-card');
      div.appendChild(card);
      return card.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-text></ui-text>';
      let text = div.querySelector('ui-text');
      return text.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let text = document.createElement('ui-text');
      div.appendChild(text);
      return text.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
    });

    it('should take any initial text content as view-text', done => {
      div.innerHTML = '<ui-text>foo</ui-text>';
      let text = div.querySelector('ui-text');
      return text.onReady(_ => {
        expect(text.selectInternalElement('span').textContent.trim()).toBe('foo');
        expect(text.viewText).toBe('foo');
        expect(text.attr('view-text')).toBe('foo');
        expect(text.textContent).toBe('foo');
      }).then(done).catch(done);
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
      }).then(done).catch(done);
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
      }).catch(done);
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
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let checkbox = document.createElement('ui-checkbox');
      div.appendChild(checkbox);
      return checkbox.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let button = document.createElement('ui-button');
      div.appendChild(button);
      return button.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let fab = document.createElement('ui-fab');
      div.appendChild(fab);
      return fab.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
    });

    it('should be floating', done => {
      div.innerHTML = '<ui-fab></ui-fab>';
      let fab = div.querySelector('ui-fab');
      return fab.onReady(_ => {
        expect(fab.floatingY).toBe(true);
        let boxShadow = window.getComputedStyle(fab).boxShadow;
        expect(Boolean(boxShadow)).toBe(true);
      }).then(done).catch(done);
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
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let hamburger = document.createElement('ui-hamburger');
      div.appendChild(hamburger);
      return hamburger.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-dialog></ui-dialog>';
      let dialog = div.querySelector('ui-dialog');
      return dialog.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let dialog = document.createElement('ui-dialog');
      div.appendChild(dialog);
      return dialog.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
    });

    it('emit an event on opening', done => {
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
      }).catch(done);
    });

    it('emit an event on closing', done => {
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
      }).catch(done);
    });

    it('should respond to a confirmer, including emitting an appropiate event', done => {
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
      }).catch(done);
    });

    it('should respond to a dismisser, including emitting an appropiate event', done => {
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
      }).catch(done);
    });

    it('should be modal if specified', done => {
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
      }).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let alert = document.createElement('ui-alert');
      div.appendChild(alert);
      return alert.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
    });

    it('emit an event on opening', done => {
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
      }).catch(done);
    });

    it('emit an event on closing', done => {
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
      }).catch(done);
    });

    it('should respond to a confirmer, including emitting an appropiate event', done => {
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
      }).catch(done);
    });

    it('should respond to a dismisser, including emitting an appropiate event', done => {
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
      }).catch(done);
    });

    it('should be modal', done => {
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
      }).catch(done);
    });

    it('should have an alert method that opens the dialog and sets content appropriately', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        alert.alert('foobar');
        setTimeout(() => {
          expect(alert.isOpen).toBe(true);
          expect(alert.textContent).toBe('foobar');
          done();
        }, 505);
      }).catch(done);
    });

    it('should have the closer focused on open', done => {
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
          console.log(alert.shadowRoot.activeElement);
          alert.shadowRoot.activeElement.click();
          setTimeout(() => {
            if (!flag) throw new Error('closer not focused');
          }, 600);
        }, 505);
      }).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-drawer></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      return drawer.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let drawer = document.createElement('ui-drawer');
      div.appendChild(drawer);
      return drawer.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
    });

    it('should be able to be toggled by an appropriate element already in DOM', done => {
      div.innerHTML = '<ui-hamburger drawer-toggle></ui-hamburger><ui-drawer></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      let hamburger = div.querySelector('ui-hamburger');
      return drawer.onReady(_ => {
        hamburger.click();
        setTimeout(() => {
          expect(drawer.isOpen).toBe(true);
          done();
        }, 505); // slide animation, ripple on button
      }).catch(done);
    });

    it('should emit appropriate events', done => {
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
      }).catch(done);
    });

    it('should be modal if specified', done => {
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
      }).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-toolbar></ui-toolbar>';
      let toolbar = div.querySelector('ui-toolbar');
      return toolbar.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let toolbar = document.createElement('ui-toolbar');
      div.appendChild(toolbar);
      return toolbar.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-tab></ui-tab>';
      let tab = div.querySelector('ui-tab');
      return tab.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let tab = document.createElement('ui-tab');
      div.appendChild(tab);
      return tab.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-tabs></ui-tabs>';
      let tabs = div.querySelector('ui-tabs');
      return tabs.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let tabs = document.createElement('ui-tabs');
      div.appendChild(tabs);
      return tabs.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-input></ui-input>';
      let ip = div.querySelector('ui-input');
      return ip.onReady(_ => {
        ip.value = 'pizza';
        // I know, I know, testing implementation details is bad, but warranted here.
        let value = ip.selectInternalElement('input').value;
        expect(value).toBe('pizza');
        expect(ip.attr('value')).toBe('pizza');
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let ip = document.createElement('ui-input');
      div.appendChild(ip);
      return ip.onReady(_ => {
        ip.value = 'pizza';
        // I know, I know, testing implementation details is bad, but warranted here.
        let value = ip.selectInternalElement('input').value;
        expect(value).toBe('pizza');
        expect(ip.attr('value')).toBe('pizza');
      }).then(done).catch(done);
    });

    it('should support a default value', done => {
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
      }).then(done).catch(done);

      div.appendChild(ip);
    });

    it('should fire change event exactly once on value changes', done => {
      let ip = document.createElement('ui-input');
      let count = 0;
      let listen = e => ++count;
      ip.onReady(_ => {
        ip.on('change', listen);
        ip.value = '3';
        ip.remove(listen);
        expect(count).toBe(1);
      }).then(done).catch(done);

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

    it('should work for innerHTML', done => {
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
      }).then(done).catch(done);
    });

    it('should work for appendChild', done => {
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
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
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
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
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
      }).then(done).catch(done);
    });

    it('should fire change event exactly once on value changes', done => {
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
      }).catch(done);

      div.appendChild(dd);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-login></ui-login>';
      let login = div.querySelector('ui-login');
      return login.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let login = document.createElement('ui-login');
      div.appendChild(login);
      return login.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-router></ui-router>';
      let router = div.querySelector('ui-router');
      return router.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let router = document.createElement('ui-router');
      div.appendChild(router);
      return router.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-route></ui-route>';
      let route = div.querySelector('ui-route');
      return route.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(done);
    });

    it('should be able to be appended to another element.', done => {
      let route = document.createElement('ui-route');
      div.appendChild(route);
      return route.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(done);
    });
  });
});
