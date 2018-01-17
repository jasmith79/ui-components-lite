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
            <ui-item>Foo</ui-item>
            <ui-item value="passed" is-selected>Bar</ui-item>
          </ui-drop-down>
        `;

        document.body.appendChild(div);
        output.innerHTML += `<p class="ok">Appended ${name} OK.</p>`;
        let dd = document.querySelector('#ddinnerhtml');

        return dd.isReady.then(_ => {
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

        let item2 = document.createElement('ui-item');
        item2.textContent = 'Bar';
        item2.value = 'passed';
        item2.setAttribute('is-selected', true);

        dd.appendChild(item1);
        dd.appendChild(item2);
        document.body.appendChild(dd);

        window.item1 = item1;
        window.item2 = item2;

        output.innerHTML += `<p class="ok">Appended ${name} OK.</p>`;
        dd = document.querySelector('#createElement');

        return dd.isReady.then(_ => {
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
    }
  },

  'ui-input': {
    'Input via document.createElement': (name, output) => {
      let ip = document.createElement('ui-input');
      document.body.appendChild(ip);
      return ip.onReady(_ => {
        ip.value = 'pizza';
        let value = ip._input.value; // I know, I know
        if (value === 'pizza' && ip.attr('value') === 'pizza') {
          output.innerHTML += `<p class="ok">ui-input has expected value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">ui-input has expected value ${value}.</p>`;
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
          output.innerHTML += `<p class="ok">ui-input has expected value.</p>`;
        } else {
          output.innerHTML += `<p class="fail">ui-input has expected value ${value}.</p>`;
        }

        document.body.removeChild(div);
      });
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

        date1.value = '2015-02-10';
        if (date1.value.getTime() === new Date(2015, 1, 10).getTime()) {
          output.innerHTML += `<p class="ok">date1 has expected value for Dt string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected value ${date1.value} for Dt string.</p>`;
        }

        date1.value = new Date(2014, 3, 1).toISOString();
        if (date1.value.getTime() === new Date(2014, 3, 1).getTime()) {
          output.innerHTML += `<p class="ok">date1 has expected value for ISO string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date1 has unexpected value ${date1.value} for ISO string.</p>`;
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

        date2.value = '2015-02-10';
        if (date2.value.getTime() === new Date(2015, 1, 10).getTime()) {
          output.innerHTML += `<p class="ok">date2 has expected value for Dt string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected value ${date2.value} for Dt string.</p>`;
        }

        date2.value = new Date(2014, 3, 1).toISOString();
        if (date2.value.getTime() === new Date(2014, 3, 1).getTime()) {
          output.innerHTML += `<p class="ok">date2 has expected value for ISO string.</p>`;
        } else {
          output.innerHTML += `<p class="fail">date2 has unexpected value ${date2.value} for ISO string.</p>`;
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
});
