import event2Promise from './promise-from-event.js';

export default elem => {
  if (!('_isReady' in elem) || elem._isReady) {
    return Promise.resolve(elem);
  } else {
    return event2Promise({
      eventName: 'ui-component-ready',
      element: elem
    }).then(_ => elem);
  }
};
