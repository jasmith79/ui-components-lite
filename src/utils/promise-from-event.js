/*
 * promise-from-event.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * Utility function that returns a Promise that resolves as soon as the associated event fires.
 *
 * NOTE: the listener is automatically removed when the event fires, so no memory leak and
 * side effects will only happen once. If you want to respond every time an event fires, well,
 * they make addEventListener for that.
 */

export default ({ eventName, element, callback, timeout }) => {
  if (!eventName || !element) {
    throw new TypeError(`Missing required arguments to function.`);
  }

  return new Promise((res, rej) => {
    let timeoutHandle;
    if (timeout != null) {
      timeoutHandle = setTimeout(() => {
        rej(new Error(`The element ${element.identity || element.id || ''} did not fire the event ${eventName} before the ${timeout}ms timeout.`));
      }, timeout);
    }

    const listener = e => {
      clearTimeout(timeoutHandle);
      element.removeEventListener(eventName, listener);
      if (callback) res(callback(e));
      res(e);
    };

    element.addEventListener(eventName, listener);
  });
};
