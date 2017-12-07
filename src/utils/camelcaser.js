const snake = /[\-\_]+([a-zA-Z])/g;
const camelSplitter = /([A-Z])/;

const camelize = function (str) {
  return str.replace(snake, m => m[1].toUpperCase());
};

const deCamelize = function (str) {
  const pieces = str.split(camelSplitter).filter(x => x);
  return pieces
    .map((piece, i, arr) => {
      if (piece.toUpperCase() === piece) {
        const next = arr[i + 1];
        const prev = arr[i - 1];
        if (!prev) return piece;
        const nextCap = next && next.toUpperCase() === next;
        const prevCap = prev && prev.toUpperCase() === prev;
        if (nextCap && !prevCap && i) return `_${piece}`;
        if (nextCap || prevCap) return piece;
        return `_${piece.toLowerCase()}`;
      }
      return piece;
    })
    .join('');
};

export default camelize;
export {
  camelize as camelCaser,
  deCamelize
};
