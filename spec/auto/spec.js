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
  describe('ui-fab', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-hamburger', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-alert', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-drawer', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-toolbar', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-tab', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-text', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
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
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });

  describe('ui-router', () => {
    it('should ', done => {
      expect(true).toBe(true);done();
    });
  });
});
