// TODO: flesh this out
import { document, global } from '../../src/utils/ui-component-base.js';

export default () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
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
};
