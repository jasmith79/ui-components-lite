import extractType from '../../node_modules/extracttype/extracttype.js';
import { random } from '../../node_modules/jsstring/src/jsstring.js';
import { memoize, partitionBy } from './functional.js';

const generateCSSClassName = () => random.alpha(1) + random.alphanumeric(5);
const pseudoRegex = /^:+/;
const closeBraceRegex = /\}$/;
const isPseudo = s => Boolean(s.match(pseudoRegex));
const hasClosingBrace = s => Boolean(s.match(closeBraceRegex));

const objToCss = (obj, class_) => {
  const entries = Object.entries(obj);
  const [regular, pseudo] = partitionBy(([k]) => !isPseudo(k), entries);
  return '{' + regular.map(([k, v]) => `${k}:${v};`).join('') + '}' +
    pseudo.map(([k, v]) => `.${class_}${k}${objToCss(v, class_)}`).join('');
};

const convert = memoize(obj => {
  const class_ = generateCSSClassName();
  return [class_, '.' + class_ + objToCss(obj, class_)];
});

export default convert;
