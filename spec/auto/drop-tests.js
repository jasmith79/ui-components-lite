// TODO: flesh this out
import { document, global } from '../../src/utils/ui-component-base.js';

export default () => {
  describe('ui-drop-down', () => {
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
      div.innerHTML = `
        <ui-drop-down id="ddinnerhtml">
          <ui-item id="item-1">Foo</ui-item>
          <ui-item id="item-2" value="passed" is-selected>Bar</ui-item>
        </ui-drop-down>
      `;

      let dd = document.querySelector('#ddinnerhtml');

      return dd.onReady(_ => {
        expect(dd.value).toBe('passed');
        expect(dd.textContent.trim()).toBe('Bar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let dd = document.createElement('ui-drop-down');
      dd.id = 'createElement';

      let item1 = document.createElement('ui-item');
      item1.textContent = 'Foo';
      item1.id = 'item-3';

      let item2 = document.createElement('ui-item');
      item2.textContent = 'Bar';
      item2.value = 'passed';
      item2.setAttribute('is-selected', true);
      item2.id = 'item-4';

      dd.appendChild(item1);
      dd.appendChild(item2);
      div.appendChild(dd);
      dd.onReady(_ => {
        expect(dd.value).toBe('passed');
        expect(dd.textContent.trim()).toBe('Bar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should fire change event exactly once on value changes', done => {
      let dd = document.createElement('ui-drop-down');
      let item = document.createElement('ui-item');
      dd.appendChild(item);
      item.value = '3oo';
      let count = 0;
      let listen = e => {
        ++count;
        dd.remove(listen);
      };

      dd.on('change', listen);
      return dd.onReady(_ => {
        dd.selected = item;
        setTimeout(() => {
          expect(count).toBe(1);
          done();
        }, 10);
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(dd);
    });
  });

  it('should fire change event with correct value', done => {
    let dd = document.createElement('ui-drop-down');
    let item = document.createElement('ui-item');
    dd.appendChild(item);
    item.value = '3oo';
    let result = null;
    let listen = e => {
      result = e.value;
      dd.remove(listen);
    };

    dd.on('change', listen);
    return dd.onReady(_ => {
      dd.selected = item;
      setTimeout(() => {
        expect(result).toBe('3oo');
        done();
      }, 10);
    }).catch(err => {
      console.error(err);
      throw err;
    });

    div.appendChild(dd);
  });

  it('should have updated value and selected property on change', done => {
    let dd = document.createElement('ui-drop-down');
    let item = document.createElement('ui-item');
    dd.appendChild(item);
    item.value = '3oo';
    let sel = null, val = null;
    let listen = e => {
      val = dd.value;
      sel = dd.selected;
      dd.remove(listen);
      expect(val).toBe('3oo');
      expect(sel).toEqual(item);
      done();
    };

    dd.on('change', listen);
    return dd.onReady(_ => {
      item.click();
    }).catch(err => {
      console.error(err);
      throw err;
    });

    div.appendChild(dd);
  });


  describe('ui-drop-down multiple', () => {
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

    it('should allow serially selecting multiple items', done => {
      div.innerHTML = `
        <ui-drop-down multiple>
          <ui-item value="1">Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
      `;

      let dd = div.querySelector('ui-drop-down');
      dd.onReady(_ => {
        dd.value = '1';
        expect(dd.value).toBe('1');
        dd.value = 'Bar';
        expect(dd.value).toBe('1,Bar');
        done();
      });
    });

    it('should not allow selecting the same item twice', done => {
      div.innerHTML = `
        <ui-drop-down multiple>
          <ui-item value="1">Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
        <ui-drop-down multiple>
          <ui-item is-selected>Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
      `;

      let [dd1, dd2] = [...div.querySelectorAll('ui-drop-down')];
      Promise.all([
        dd1.onReady(_ => {
          dd.value = "1";
          expect(dd1.value).toBe("1");
          dd.value = "1";
          expect(dd1.value).toBe("1");
        }),
        dd2.onReady(_ => {
          expect(dd2.value).toBe("Foo");
          dd2.value = 0;
          expect(dd2.value).toBe("Foo");
          dd2.value = "Foo";
          expect(dd2.value).toBe("Foo");
        }),
      ]).then(done).catch(done);
    
    });

    it('should allow serially selecting based on list position', done => {
      div.innerHTML = `
        <ui-drop-down multiple>
          <ui-item value="1">Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
      `;
      
      let dd = div.querySelector('ui-drop-down');
      dd.onReady(_ => {
        dd.value = 1;
        expect(dd.value).toBe('Bar');
        dd.value = 0;
        expect(dd.value).toBe('1,Bar');
        done();
      });
    });
    
    it('should allow passing an array of values to select', done => {
      div.innerHTML = `
        <ui-drop-down multiple>
          <ui-item value="1">Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
      `;
    
      let dd = div.querySelector('ui-drop-down');
      dd.onReady(_ => {
        dd.value = ['1', 'Bar'];
        expect(dd.value).toBe('1,Bar');
        done();
      });
    });
    
    it('should allow passing an array of positions to select', done => {
      div.innerHTML = `
        <ui-drop-down multiple>
          <ui-item value="1">Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
      `;
    
      let dd = div.querySelector('ui-drop-down');
      dd.onReady(_ => {
        dd.value = [1, 0];
        expect(dd.value).toBe('1,Bar');
        done();
      });
    });

    it('should ignore duplicates in the array', done => {
      div.innerHTML = `
        <ui-drop-down multiple>
          <ui-item value="1">Foo</ui-item>
          <ui-item>Bar</ui-item>
        </ui-drop-down>
      `;
    
      let dd = div.querySelector('ui-drop-down');
      dd.onReady(_ => {
        dd.value = [1, 0, 1];
        expect(dd.value).toBe('1,Bar');
        done();
      });
    });
  });
};
