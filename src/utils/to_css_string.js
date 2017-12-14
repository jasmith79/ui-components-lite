import extractType from '../../node_modules/extracttype/extracttype.js';
import { random } from '../../node_modules/jsstring/src/jsstring.js';
import { memoize, partitionBy } from './functional.js';

const generateCSSClassName = () => random.alpha(1) + random.alphanumeric(5);

const objToCss = (obj, class_) => {
  const entries = Object.entries(obj);
  const [regular, nested] = partitionBy(([k, v]) => extractType(v) === 'String', entries);
  const str = '{' +
    regular.map(([k, v]) => `${k}:${v};`).join('') +
    '}' +
    nested.map(([k, v]) => `.${class_}${k}${objToCss(v, class_)}`).join('');

  return str;
};

const convert = memoize(obj => {
  const class_ = generateCSSClassName();
  return [class_, '.' + class_ + objToCss(obj, class_)];
});

export default convert;
