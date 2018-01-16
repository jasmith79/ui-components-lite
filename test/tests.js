import '../src/elements/drop-down.js';

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
