// POLYFILLS
// Here's for all the stuff Babel doesn't do without configuring a hot mess o'plugins

let convertNullErr = new TypeError('Cannot convert null or undefined to object');
let toStr = o => Object.prototype.toString.call(o);
let identity = x => x

// Function.prototype.name
(p => {
  let f = function hasName() {};
  if (f.name === 'hasName') {
    return;
  }

  Object.defineProperty(p, 'name', {
    get: function() {
      return (this.toString().match(/^\s*function\s*(\S*)\s*\(/) || [])[1] || '';
    }
  });

  return;
})(Function.prototype);

// CustomEvent, IE only
(_ => {
  if (toStr(window.CustomEvent) === '[object Function]') return;

  let CustomEvent = function CustomEvent (
    event,
    params={ bubbles: false, cancelable: false, detail: undefined }
  ) {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return;
})();

// Array.from
(_ => {
  if (Array.from == null) {
    Object.defineProperty(Array, 'from', {
      value: function(o, f, thisArg) {
        if (o == null) throw convertNullErr; // per spec
        if (f != null && toStr(f) !== '[object Function]') {
          throw new TypeError('Mapping function must be a callable function.');
        }

        let res = [];

        if (toStr(o.forEach) === '[object Function]') {
          o.forEach(v => res.push((f || identity).call((thisArg || o), v)));
        } else if (Symbol && Symbol.iterator && obj[Symbol.iterator]) {
          // need this for generators
          let iter = obj[Symbol.iterator]();
          let done = false;
          while (!done) {
            let v = iter.next()
            res.push(v.value);
            done = v.done;
          }
        } else if (o.length) {
          for (let i=0; i < o.length; ++i) {
            res.push((f || identity).call((thisArg || o), o[i]));
          }
        }

        return res;
      }
    });
  }

  return;
})();

// Array.prototype.includes
(p => {
  if ([].includes == null) {
    Object.defineProperty(p, 'includes', {
      value: function(item) {
        return this.indexOf(item) !== -1;
      }
    });
  }
})(Array.prototype);

// Object.assign
if (Object.assign == null) {
  Object.defineProperty(Object, 'assign', {
    value: function() {
      var args = Array.from(arguments);
      var target = args.shift();

      if (target == null) {
        throw convertNullErr;
      }

      var i = 0, j = 0, jlen = 0, ilen = args.length, keys = [], key = '';
      for (i; i < ilen; ++i) {
        // unlike above, having a null here just has no effect rather than throwing a conversion
        // error
        if (args[i] != null) {
          keys = Object.keys(args[i]);
          j = 0;
          jlen = keys.length;
          for (j; j < jlen; ++j) {
            key = keys[j];
            target[key] = args[i][key];
          }
        }
      }
      return target;
    }
  });
}

// Object.values
if (Object.values == null) {
  Object.defineProperty(Object, 'values', {
    value: obl => {
      if (obj == null) throw convertNullErr;
      return Object.key(obj).map(k => obj[k]);
    }
  });
}

// Object.entries
if (Object.entries == null) {
  Object.defineProperty(Object, 'entries', {
    value: obj => {
      if (obj == null) throw convertNullErr;
      return Object.key(obj).map(k => [k, obj[k]]);
    }
  });
}

// NodeList.prototype.forEach
if (NodeList.prototype.forEach == null) {
  NodeList.prototype.forEach = function(callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this, this[i], i, this);
    }
  };
}