export default ({ eventName, element, callback, timeout }) => {
  if (!eventName || !element) {
    throw new TypeError(`Missing required arguments to function.`);
  }

  return new Promise((res, rej) => {
    let timeoutHandle;
    if (timeout) {
      timeoutHandle = setTimeout(() => {
        rej(new Error(`The element did not fire the event before the ${timeout}ms timeout.`));
      }, timeout);
    }

    const listener = e => {
      clearTimeout(timeoutHandle);
      element.removeEventListener(eventName, listener);
      if (callback) callback(e);
      res(e);
    };

    element.addEventListener(eventName, listener);
  });
};
