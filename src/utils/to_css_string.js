import extractType from '../../node_modules/extracttype/extracttype.js';

const convert = (obj, joiner=';') => {
  return Object.entries(obj)
    .map(([k, v]) => {
      switch (extractType(v)) {
        case 'String':
        case 'Number':
          return `${k}:${v}`;

        case 'Object':
          return `${k}{${convert(obj)}}`;
      }
    })
    .join(joiner);
};

export default convert;
