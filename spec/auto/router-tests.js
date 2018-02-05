// TODO: flesh these out

import { document, global } from '../../src/utils/ui-component-base.js';

export const routerTests = () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let router = document.createElement('ui-router');
      div.appendChild(router);
      return router.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
};

export const routeTests = () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let route = document.createElement('ui-route');
      div.appendChild(route);
      return route.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
};
