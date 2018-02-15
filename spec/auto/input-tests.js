// TODO: add time, number, etc. tests
import { document, global } from '../../src/utils/ui-component-base.js';

export default () => {
  describe('ui-input', () => {
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
      div.innerHTML = '<ui-input></ui-input>';
      let ip = div.querySelector('ui-input');
      return ip.onReady(_ => {
        ip.value = 'pizza';
        // I know, I know, testing implementation details is bad, but warranted here.
        let value = ip.selectInternalElement('input').value;
        expect(value).toBe('pizza');
        expect(ip.attr('value')).toBe('pizza');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should be able to be appended to another element.', done => {
      let ip = document.createElement('ui-input');
      div.appendChild(ip);
      return ip.onReady(_ => {
        ip.value = 'pizza';
        // I know, I know, testing implementation details is bad, but warranted here.
        let value = ip.selectInternalElement('input').value;
        expect(value).toBe('pizza');
        expect(ip.attr('value')).toBe('pizza');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should support an imperative default value', done => {
      let ip = document.createElement('ui-input');
      ip.attr('placeholder', 'barfoo');
      ip.onReady(_ => {
        ip.defaultValue = 'foobar';
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '5';
        expect(ip.selectInternalElement('input').value).toBe('5');
        ip.value = null;
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '3';
        expect(ip.selectInternalElement('input').value).toBe('3');
        ip.value = '';
        expect(ip.selectInternalElement('input').value).toBe('foobar');
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    it('should support an declarative default value', done => {
      div.innerHTML = '<ui-input default-value="foobar"></ui-input>';
      let ip = div.querySelector('ui-input');
      return ip.onReady(_ => {
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '5';
        expect(ip.selectInternalElement('input').value).toBe('5');
        ip.value = null;
        expect(ip.selectInternalElement('input').value).toBe('foobar');

        ip.value = '3';
        expect(ip.selectInternalElement('input').value).toBe('3');
        ip.value = '';
        expect(ip.selectInternalElement('input').value).toBe('foobar');

      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    it('should fire change event exactly once on value changes', done => {
      let ip = document.createElement('ui-input');
      let count = 0;
      let listen = e => {
        ++count;
        ip.remove(listen);
      }
      ip.on('change', listen);
      ip.onReady(_ => {
        ip.value = '3';
        setTimeout(() => {
          expect(count).toBe(1);
          done();
        }, 10);
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    it('should fire change event with correct value', done => {
      let ip = document.createElement('ui-input');
      let result = null;
      let listen = e => {
        result = e.value;
        ip.remove(listen);
        expect(result).toBe(3);
        done();
      };

      ip.onReady(_ => {
        ip.on('change', listen);
        ip.value = '3';
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    it('should have correct value property/attribute', done => {
      let ip = document.createElement('ui-input');
      let result = null, attr = null;
      let listen = e => {
        result = ip.value;
        attr = ip.attr('value');
        ip.remove(listen);
        expect(result).toBe(3);
        expect(attr).toBe(3);
        done();
      };

      ip.onReady(_ => {
        ip.on('change', listen);
        ip.value = '3';
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });

    it('should not have the label moved over if placeholder', done => {
      let ip = document.createElement('ui-input');
      ip.attr('label', 'Foo');
      div.innerHTML = `
        <ui-input label="Foo" placeholder="Bar"></ui-input>
      `;
      let ip2 = div.querySelector('ui-input');
      ip.onReady(_ => {
        expect(ip.selectInternalElement('ui-text').classList.contains('text-moved')).toBe(true);
        ip.attr('placeholder', 'Bar');
        expect(ip.selectInternalElement('ui-text').classList.contains('text-moved')).toBe(false);
        expect(ip2.selectInternalElement('ui-text').classList.contains('text-moved')).toBe(false);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });
  });

  describe('ui-input:date', () => {
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

    it('should work for innerHTML', done => {
      div.innerHTML = '<ui-input type="date" id="date-1"></ui-input>';
      let date1 = div.querySelector('#date-1');
      date1.onReady(_ => {
        let test = new Date(2017, 0, 1);
        date1.value = test;
        expect(date1.value.getTime()).toBe(test.getTime());
        expect(date1.classList.contains('empty')).toBe(false);

        date1.value = '2015-02-10';
        expect(date1.value.getTime()).toBe(new Date(2015, 1, 10).getTime());

        date1.value = null;
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);

        date1.value = new Date(2014, 3, 1).toISOString();
        expect(date1.value.getTime()).toBe(new Date(2014, 3, 1).getTime());

        date1.value = new Date('foo');
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should work for appendChild', done => {
      div.innerHTML = '<ui-input type="date" id="date-1"></ui-input>';
      let date1 = div.querySelector('#date-1');
      date1.onReady(_ => {
        let test = new Date(2017, 0, 1);
        date1.value = test;
        expect(date1.value.getTime()).toBe(test.getTime());
        expect(date1.classList.contains('empty')).toBe(false);

        date1.value = '2015-02-10';
        expect(date1.value.getTime()).toBe(new Date(2015, 1, 10).getTime());

        date1.value = null;
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);

        date1.value = new Date(2014, 3, 1).toISOString();
        expect(date1.value.getTime()).toBe(new Date(2014, 3, 1).getTime());

        date1.value = new Date('foo');
        expect(date1.value).toBeNull();
        expect(date1.classList.contains('empty')).toBe(true);
      }).then(done).catch(err => {
        console.error(err);
        throw err;
      });
    });

    it('should not have the label moved over', done => {
      let ip = document.createElement('ui-input');
      ip.attr('label', 'Foo');
      ip.attr('type', 'date');

      div.innerHTML = `
        <ui-input type="date" label="bar"></ui-input>
      `;
      let ip2 = div.querySelector('ui-input');
      ip.onReady(_ => {
        expect(ip.selectInternalElement('ui-text').classList.contains('text-moved')).toBe(false);
        expect(ip2.selectInternalElement('ui-text').classList.contains('text-moved')).toBe(false);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });

      div.appendChild(ip);
    });
  });
};

describe('ui-input:ipv4', () => {
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

  it('should correctly validate ipv4 addresses', done => {
    let goodList = [
			'0.0.0.0',
			'192.168.1.1',
			'255.255.255.255'
		];

    let badList = [
			'10.168.0001.100',  
			'0.0.0.256',
			'256.255.255.255',  
			'256.0.0.0',
			'192.168. 224.0',
			'192.168.224.0 1',
			'255.255',
			'0.9.0.98.1'
		];

    div.innerHTML += '<ui-input type="ipv4"></ui-input>';
    let input = div.querySelector('ui-input');
    input.onReady(_ => {
			expect(input.isValid).toBe(false);
      let goodDone = Promise.all(goodList.map(ip => {
        input.value = ip;
        return new Promise(res => {
          setTimeout(() => {
            expect(input.isValid).toBe(true);
            input.value = null;
            setTimeout(() => {
              expect(input.isValid).toBe(false);
              res();
            }, 10);
          }, 10);
        }); 
      }));

      let badDone = Promise.all(badList.map(ip => {
        return new Promise(res => {
					input.value = goodList[0];
					setTimeout(() => {
						expect(input.isValid).toBe(true);
						input.value = ip;
						setTimeout(() => {
							expect(input.isValid).toBe(false);
							res();
						}, 10);
					}, 10);
        }) 
      }));

      Promise.all([goodDone, badDone]).then(done).catch(console.error);
    }).catch(err => {
      console.error(err);
      throw err;
    });
  });
});

describe('ui-input:ipv6', () => {
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

  it('should correctly validate ipv6 addresses', done => {
    let goodList = [
			'0000:0000:0000:0000:0000:0000:0000:0000',  
			'fe00::1',
			'fe80::217:f2ff:fe07:ed62',
			'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',  
			'2001:0db8:0000:85a3:0000:0000:ac1f:8001',
			'::1',
			'1::'
    ]

    let badList = [
			'02001:0000:1234:0000:0000:C1C0:ABCD:0876',
			'2001:0000:1234:0000:00001:C1C0:ABCD:0876',
			'2001:0000:1234: 0000:0000:C1C0:ABCD:0876',
			'2001:0000:1234:0000:0000:C1C0:ABCD:0876 0',
			'3ffe:0b00:0000:0001:0000:0000:000a',
			'FF02:0000:0000:0000:0000:0000:0000:0000:0001',
			'::1111:2222:3333:4444:5555:6666::',
			'3ffe:b00::1::a'
		];

    div.innerHTML += '<ui-input type="ipv6"></ui-input>';
    let input = div.querySelector('ui-input');
    input.onReady(_ => {
			expect(input.isValid).toBe(false);
      let goodDone = Promise.all(goodList.map(ip => {
        input.value = ip;
        return new Promise(res => {
          setTimeout(() => {
            expect(input.isValid).toBe(true);
            input.value = null;
            setTimeout(() => {
              expect(input.isValid).toBe(false);
              res();
            }, 10);
          }, 10);
        }); 
      }));

      let badDone = Promise.all(badList.map(ip => {
        return new Promise(res => {
					input.value = goodList[0];
					setTimeout(() => {
						expect(input.isValid).toBe(true);
						input.value = ip;
						setTimeout(() => {
							expect(input.isValid).toBe(false);
							res();
						}, 10);
					}, 10);
        }) 
      }));

      Promise.all([goodDone, badDone]).then(done).catch(console.error);
    }).catch(err => {
      console.error(err);
      throw err;
    });
  });
});
