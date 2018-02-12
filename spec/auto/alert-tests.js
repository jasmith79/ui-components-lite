import { document, global } from '../../src/utils/ui-component-base.js';
export default () => {
  describe('ui-alert', () => {
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
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        expect(true).toBe(true); // mostly testing for errors
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let alert = document.createElement('ui-alert');
      div.appendChild(alert);
      return alert.onReady(_ => {
        expect(true).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('emit an event on opening', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-opened', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 10);

        alert.open();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('emit an event on closing', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-closed', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 10);

        alert.open();
        alert.close();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should respond to a confirmer, including emitting an appropiate event', done => {
      div.innerHTML = '<ui-alert><ui-button dialog-confirm>Confirm</ui-button></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-confirm', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 505); // need to wait for ripple animation on button

        alert.open();
        alert.querySelector('ui-button').click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should respond to a dismisser, including emitting an appropiate event', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-dismiss', e => {
          expect(true).toBe(true);
          flag = true;
          done();
        });

        setTimeout(() => {
          if (!flag) {
            throw new Error('event did not fire');
          }
        }, 700);

        alert.open();
        alert.selectInternalElement('ui-button').click();
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be modal', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        expect(alert.isModal).toBe(true);
        alert.open();
        alert.on('dialog-closed', e => {
          flag = true;
          done();
        });

        setTimeout(() => {
          alert._backdrop.click();
        }, 550);

        setTimeout(() => {
          if (!flag) throw new Error('modal fail.');
        }, 1200);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should have an alert method that opens the dialog and sets content appropriately', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        alert.alert('foobar');
        setTimeout(() => {
          expect(alert.isOpen).toBe(true);
          expect(alert.textContent).toBe('foobar');
          done();
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should have the closer focused on open', done => {
      div.innerHTML = '<ui-alert></ui-alert>';
      let alert = div.querySelector('ui-alert');
      return alert.onReady(_ => {
        let flag = false;
        alert.on('dialog-dismiss', e => {
          flag = true;
          done();
        });

        alert.alert('foobar');
        setTimeout(() => {
          expect(alert.isOpen).toBe(true);
          alert.shadowRoot.activeElement.click();
          setTimeout(() => {
            if (!flag) throw new Error('closer not focused');
          }, 600);
        }, 505);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    });
  });
};
