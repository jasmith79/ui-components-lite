import { document, global } from '../../src/utils/ui-component-base.js';
export default () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let login = document.createElement('ui-login');
      div.appendChild(login);
      return login.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('loads from session storage', done => {
      expect(false).toBe(true);
      done();
    });

    it('logs out automatically on timeout', done => {
      expect(false).toBe(true);
      done();
    });

    it('credentials method: returns internal form.serialize', done => {
      expect(false).toBe(true);
      done();
    });
  });
};
