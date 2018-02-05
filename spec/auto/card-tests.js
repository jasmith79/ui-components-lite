import { document, global } from '../../src/utils/ui-component-base.js';
export default () => {
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
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
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
};
