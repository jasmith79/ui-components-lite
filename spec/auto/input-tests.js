// TODO: add time, number, etc. tests
import { document, global } from '../../src/utils/ui-component-base.js';

export default () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should support an imperative default value', done => {
      let ip = document.createElement('ui-input');
      ip.attr('placeholder', 'barfoo');
      ip.onReady(_ => {
        ip.defaultValue = 'foobar';
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '5';
        expect(ip.selectInternalElement('input').value).toBe('5');
        ip.value = null;
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '3';
        expect(ip.selectInternalElement('input').value).toBe('3');
        ip.value = '';
        expect(ip.selectInternalElement('input').value).toBe('foobar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    it('should support an declarative default value', done => {
      div.innerHTML = '<ui-input default-value="foobar"></ui-input>';
      let ip = div.querySelector('ui-input');
      return ip.onReady(_ => {
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '5';
        expect(ip.selectInternalElement('input').value).toBe('5');
        ip.value = null;
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '3';
        expect(ip.selectInternalElement('input').value).toBe('3');
        ip.value = '';
        expect(ip.selectInternalElement('input').value).toBe('foobar');

      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });

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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
};
