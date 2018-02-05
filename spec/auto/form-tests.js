import { document, global } from '../../src/utils/ui-component-base.js';
import extractType from '../../../extracttype/extracttype.js';

export default () => {
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

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-form></ui-form>';
      let form = div.querySelector('ui-form');
      return form.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
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

    it('submit method: submits the form', done => {
      expect(false).toBe(true);
      done();
    });

    it('checks cached data on load', done => {
      expect(false).toBe(true);
      done();
    });

    it('adds query string when updates-history', done => {
      expect(false).toBe(true);
      done();
    });
  });
};
