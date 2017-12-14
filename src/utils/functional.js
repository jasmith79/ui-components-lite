export const memoize = f => {
  const cache = {};
  return obj => {
    const str = JSON.stringify(Object.entries(obj).sort());
    if (!(str in cache)) cache[str] = f(obj);
    return cache[str];
  };
};

export const partitionBy = (pred, arr) => {
  return arr.reduce((acc, x) => {
    return (acc[pred(x) ? 0 : 1].push(x), acc);
  }, [[],[]]);
};
