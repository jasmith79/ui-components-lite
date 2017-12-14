const rippleStyles = {
  'overflow': 'hidden',
  'position': 'relative',
  'cursor': 'pointer',
  'transform': 'translate3d(0, 0, 0)',
  ':after': {
    'content': '""',
    'position': 'absolute',
    'width': '100%',
    'height': '100%',
    'top': '0',
    'left': '0',
    'opacity': '0',
    'transform': 'scale(10, 10)',
    'transition': 'transform .5s, opacity 1s',
    'pointer-events': 'none',
    'background-image': 'radial-gradient(circle, #FFF 10%, transparent 10%)',
    'background-repeat': 'no-repeat',
    'background-position': '50%',
  },
  ':active:after': {
    'opacity': '.7',
    'transform': 'scale(0, 0)',
    'transition': '0s',
    'background-color': 'orange',
  },
};

const rippleEvents = ['click', 'tap', 'dblclick'];
const handlerRegistry = new WeakMap;
const handlerFactory = (evt, f, el) => {
  const ls = handlerRegistry.get(f) || [];
  const cached = ls.reduce((acc, [e, elem, handler]) => {
    return acc || e === evt && el === elem ? handler : null;
  }, null);

  if (cached) return cached;
  const handler =  e => setTimeout(f, 500, e);
  handlerRegistry.set(f, [...ls, [evt, el, handler]]);
  return handler;
};

export default superclass => class extends superclass {
  init (...args) {
    super.init(...args);
    this.applyStyles(rippleStyles);
  }

  on (evt, f) {
    if (rippleEvents.includes(evt)) {
      super.on(evt, handlerFactory(evt, f, this));
    } else {
      super.on(evt, f);
    }
  }
}
