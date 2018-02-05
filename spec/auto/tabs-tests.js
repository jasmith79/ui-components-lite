// TODO: flesh these out
import { document, global } from '../../src/utils/ui-component-base.js';

export const tabTests = () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
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
};

export const tabsTests = () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
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
};
