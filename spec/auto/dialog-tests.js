import { document, global } from '../../src/utils/ui-component-base.js';
export default () => {
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
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let dialog = document.createElement('ui-dialog');
      div.appendChild(dialog);
      return dialog.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
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
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
};
