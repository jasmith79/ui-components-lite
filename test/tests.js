import Dropdown from '../src/elements/drop-down.js';
import { DATE_TYPE_SUPPORTED, TIME_TYPE_SUPPORTED, Input } from '../src/elements/input.js';

const resultDiv = document.querySelector('#results');

const tests = {
  'ui-drop-down': {
    'Dropdown as innerHTML': (name, output) => {
      try {
        let div = document.createElement('div');
        div.innerHTML = `
          <ui-drop-down id="ddinnerhtml">
            <ui-item id="item-1">Foo</ui-item>
            <ui-item id="item-2" value="passed" is-selected>Bar</ui-item>
          </ui-drop-down>
        `;

        document.body.appendChild(div);
        output.innerHTML += `<p class="ok">Appended ${name} OK.</p>`;
        let dd = document.querySelector('#ddinnerhtml');

        return dd.onReady(_ => {
          if (dd.value === 'passed') {
            output.innerHTML += `<p class="ok">${name} has correct value</p>`;
          } else {
            output.innerHTML += `<p class="fail">${name} has unexpected value ${dd.value}</p>`;
          }

          if (dd.textContent.trim() === 'Bar') {
            output.innerHTML += `<p class="ok">${name} has correct textcontent.</p>`;
          } else {
            output.innerHTML += `<p class="fail">${name} has unexpected textContent '${dd.textContent}'</p>`;
          }
        });
      } catch (e) {
        output.innerHTML += `<p class="fail">Error ${e} during ${name}.`;
        return;
      } finally {
        let dd = document.querySelector('#ddinnerhtml');
        if (dd) dd.parentNode.removeChild(dd);
      }
    },

    'Dropdown as createElement': (name, output) => {
      try {
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
        document.body.appendChild(dd);

        output.innerHTML += `<p class="ok">Appended ${name} OK.</p>`;
        dd = document.querySelector('#createElement');

        return dd.onReady(_ => {
          if (dd.value === 'passed') {
            output.innerHTML += `<p class="ok">${name} has correct value</p>`;
          } else {
            output.innerHTML += `<p class="fail">${name} has unexpected value ${dd.value}</p>`;
          }

          if (dd.textContent.trim() === 'Bar') {
            output.innerHTML += `<p class="ok">${name} has correct textcontent.</p>`;
          } else {
            output.innerHTML += `<p class="fail">${name} has unexpected textContent '${dd.textContent}'</p>`;
          }
        });
      } catch (e) {
        output.innerHTML += `<p class="fail">Error ${e} during ${name}.`;
        return;
      } finally {
        let dd = document.querySelector('#createElement');
        if (dd) dd.parentNode.removeChild(dd);
      }
    },

    'Dropdown change event fires exactly once on value changes': (name, output) => {
      let dd = document.createElement('ui-drop-down');
      let item = document.createElement('ui-item');
      dd.appendChild(item);
      item.value = '3oo';
      let count = 0;
      let listen = e => ++count;
      dd.on('change', listen);
      return dd.onReady(_ => {
        dd.selected = item;
        return new Promise(function(resolve, reject) {
          setTimeout(() => {
            dd.remove(listen);
            if (count === 1) {
              output.innerHTML += `<p class="ok">Dropdown change event fired ${count} times`;
            } else {
              output.innerHTML += `<p class="fail">Dropdown change event fired ${count} times`;
            }
            // document.body.removeChild(dd);
            resolve(true);
          }, 500);
        });
      });

      document.body.appendChild(dd);
    },
  },

  'ui-input': {
    'Input via document.createElement': (name, output) => {
      let ip = document.createElement('ui-input');
      document.body.appendChild(ip);
      return ip.onReady(_ => {
        ip.value = 'pizza';
        let value = ip._input.value; // I know, I know
        if (value === 'pizza' && ip.attr('value') === 'pizza') {
          output.innerHTML += `<p class="ok">${name} has expected value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">${name} has unexpected value "${value}".</p>`;
        }

        document.body.removeChild(ip);
      });
    },

    'Input as innerHTML': (name, output) => {
      let div = document.createElement('div');
      div.innerHTML = '<ui-input></ui-input>';
      let ip = div.querySelector('ui-input');
      document.body.appendChild(div);
      return ip.onReady(_ => {
        ip.value = 'pizza';
        let value = ip._input.value; // I know, I know
        if (value === 'pizza' && ip.attr('value') === 'pizza') {
          output.innerHTML += `<p class="ok">${name} has expected value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">${name} has unexpected value "${value}".</p>`;
        }

        document.body.removeChild(div);
      });
    },

    'Input default value': (name, output) => {
      let ip = document.createElement('ui-input');
      ip.attr('placeholder', 'barfoo');
      ip.onReady(_ => {
        let val = ip.selectInternalElement('input').value;

        ip.attr('default-value', 'foobar');
        val = ip.selectInternalElement('input').value;
        if (val === 'foobar') {
          output.innerHTML += `<p class="ok">${name} has expected text for default value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">${name} has unexpected text "${val}" for default value.</p>`;
        }

        ip.value = '5';
        ip.value = null;

        val = ip.selectInternalElement('input').value;
        if (val === 'foobar') {
          output.innerHTML += `<p class="ok">${name} has expected text after null set.</p>`;
        } else {
          output.innerHTML += `<p class="fail">${name} has unexpected text "${val}" after null set.</p>`;
        }

        document.body.removeChild(ip);
      });
      document.body.appendChild(ip);
    },

    'Input name as placeholder': (name, output) => {
      let ip = document.createElement('ui-input');
      ip.attr('name', 'foobar');
      ip.onReady(_ => {
        let val = ip.selectInternalElement('input').getAttribute('placeholder');
        if (val === 'foobar') {
          output.innerHTML += `<p class="ok">${name} has expected text for ${name}.</p>`;
        } else {
          output.innerHTML += `<p class="fail">${name} has unexpected text "${val}" for ${name}.</p>`;
        }
        document.body.removeChild(ip);
      });
      document.body.appendChild(ip);
    },

    'Date input': (name, output) => {
      output.innerHTML += `<p class="info">Date input natively supported: ${DATE_TYPE_SUPPORTED}.</p>`;
      let div = document.createElement('div');
      div.innerHTML = '<ui-input type="date" id="date-1"></ui-input>';
      let date1 = div.querySelector('#date-1');
      let date2 = document.createElement('ui-input');
      date2.attr('type', 'date');
      date2.id = 'date-2';
      let test1 = date1.onReady(_ => {
        let test = new Date(2017, 0, 1);
        date1.value = test;
        if (date1.value.getTime() === test.getTime()) {
          output.innerHTML += `<p class="ok">date1 has expected value for Dt obj.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected value ${date1.value} for Dt obj.</p>`;
        }

        if (!date1.classList.contains('empty')) {
          output.innerHTML += `<p class="ok">date1 has no class 'empty' after value set.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected class 'empty' after value set.</p>`;
        }

        date1.value = '2015-02-10';
        if (date1.value.getTime() === new Date(2015, 1, 10).getTime()) {
          output.innerHTML += `<p class="ok">date1 has expected value for Dt string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected value ${date1.value} for Dt string.</p>`;
        }

        date1.value = null;
        if (date1.classList.contains('empty')) {
          output.innerHTML += `<p class="ok">date1 has expected class 'empty' after reset.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 missing expected class 'empty' after reset.</p>`;
        }

        date1.value = new Date(2014, 3, 1).toISOString();
        if (date1.value.getTime() === new Date(2014, 3, 1).getTime()) {
          output.innerHTML += `<p class="ok">date1 has expected value for ISO string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected value ${date1.value} for ISO string.</p>`;
        }

        date1.value = new Date('foo');
        if (date1.classList.contains('empty')) {
          output.innerHTML += `<p class="ok">date1 has expected class 'empty' after invalid value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 missing expected class 'empty' after invalid value.</p>`;
        }
        if (date1.value === null) {
          output.innerHTML += `<p class="ok">date1 has expected null value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected value ${date1.value} after null set.</p>`;
        }
        document.body.removeChild(div);
      });

      let test2 = date2.onReady(_ => {
        let test = new Date(2017, 0, 1);
        date2.value = test;
        if (date2.value.getTime() === test.getTime()) {
          output.innerHTML += `<p class="ok">date2 has expected value for Dt obj.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected value ${date2.value} for Dt obj.</p>`;
        }

        if (!date2.classList.contains('empty')) {
          output.innerHTML += `<p class="ok">date2 has no class 'empty' after value set.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected class 'empty' after value set.</p>`;
        }

        date2.value = '2015-02-10';
        if (date2.value.getTime() === new Date(2015, 1, 10).getTime()) {
          output.innerHTML += `<p class="ok">date2 has expected value for Dt string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected value ${date2.value} for Dt string.</p>`;
        }

        date2.value = null;
        if (date2.classList.contains('empty')) {
          output.innerHTML += `<p class="ok">date2 has expected class 'empty' after reset.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 missing expected class 'empty' after reset.</p>`;
        }

        date2.value = new Date(2014, 3, 1).toISOString();
        if (date2.value.getTime() === new Date(2014, 3, 1).getTime()) {
          output.innerHTML += `<p class="ok">date2 has expected value for ISO string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected value ${date2.value} for ISO string.</p>`;
        }

        date2.value = new Date('foo');
        if (date2.classList.contains('empty')) {
          output.innerHTML += `<p class="ok">date2 has expected class 'empty' after invalid value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 missing expected class 'empty' after invalid value.</p>`;
        }
        if (date2.value === null) {
          output.innerHTML += `<p class="ok">date2 has expected null value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected value ${date2.value} after null set.</p>`;
        }
        document.body.removeChild(date2);
      });

      document.body.appendChild(div);
      document.body.appendChild(date2);

      return Promise.all([test1, test2]);
    },

    // 'Time input': (name, output) => {
    //
    // },

    'Input change event fires exactly once on value changes': (name, output) => {
      let ip = document.createElement('ui-input');
      let count = 0;
      let listen = e => ++count;
      let p = ip.onReady(_ => {
        ip.on('change', listen);
        ip.value = '3';
        ip.remove(listen);
        if (count === 1) {
          output.innerHTML += `<p class="ok">input change event fired ${count} times`;
        } else {
          output.innerHTML += `<p class="fail">input change event fired ${count} times`;
        }
        document.body.removeChild(ip);
      });

      document.body.appendChild(ip);
      return p;
    },
  },
};

let n = -300;
Promise.all(Object.entries(tests).map(([elementName, ts]) => {
  return customElements.whenDefined(elementName).then(_ => {
    resultDiv.innerHTML += `<p class="info">Running tests for ${elementName}...</p>`;
    return Promise.all(Object.entries(ts).map(([testName, testFn]) => {
      n += 300;
      return new Promise(res => {
        setTimeout(() => {
          window.onerror = e => {
            resultDiv.innerHTML += `<p>Caught global error ${e} during ${testName}.</p>`;
          };
          res(testFn(testName, resultDiv));
        }, n);
      });
    }));
  });
})).then(_ => {
  resultDiv.innerHTML += '<p>Done.</p>';
  console.log('Done');
});
