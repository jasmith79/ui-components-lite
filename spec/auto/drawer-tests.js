import { document, global } from '../../src/utils/ui-component-base.js';
export default () => {
  describe('ui-drawer', () => {
    let div;
    beforeEach(() => {
      div = document.createElement('div');
      div.classList.add('remove-me');
      document.body.appendChild(div);
    });

    afterEach(() => {
      [...document.querySelectorAll('.remove-me'), ...document.querySelectorAll('ui-backdrop')].forEach(el => {
        document.body.removeChild(el);
      });
    });

    it('should be able to be constructed via another element\'s innerHTML', done => {
      div.innerHTML = '<ui-drawer></ui-drawer>';
      let drawer = div.querySelector('ui-drawer');
      return drawer.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let drawer = document.createElement('ui-drawer');
      div.appendChild(drawer);
      return drawer.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
};
