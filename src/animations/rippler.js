import styler from '../utils/styler.js';
export default styler.getClassList({
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
});
