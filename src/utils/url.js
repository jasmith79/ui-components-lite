/*
 * url.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * url processing utility for ui-components-lite.
 */

// At some point could use the following with named capture groups?
// const urlMatcher = /(?:(https?):\/\/)?(?:(\w+)\.)?(\w+)\.(\w+)(\/[\w\/]+)?(?:\?(.+))?/
const matchProtocol = /https?/i;
const matchDomain = /\/\/([\w\.]+)[\/\?#]{1}?/;
const matchQueryString = /\?(.+)/;

const parseQueryString = qs => {
  return qs.split('&').reduce((acc, pair) => {
    const [key, v] = pair.split('=').map(decodeURIComponent);
    let value;
    try {
      value = JSON.parse(v);
    } catch (e) {
      value = v;
    }
    acc[key] = value;
    return acc;
  }, {});
};

const parseURL = url => {
  let subdomain, domain, p, qs = '';
  let secure = false;
  let path = '';
  let data = {};
  let route = '';
  let hashBang = url.match('#!');
  let [first, rest] = url.split('://');
  if (rest) secure = first.toLowerCase() === 'https';
  const protocol = secure ? 'https' : 'http';
  let [fullDomain, pAndQs] = (rest || first).split(/\/(.+)/);
  rest = fullDomain.split('.');
  subdomain = rest.length === 3 && rest[0];
  domain = rest.length === 3 ? rest.slice(1).join('.') : fullDomain;
  if (pAndQs) {
    ([p, qs] = pAndQs.split('?'));
    if (qs) data = parseQueryString(qs);
    let [serverPath, clientPath] = p.split('#!');
    if (clientPath) route = clientPath;
    path = '/' + serverPath;
  }

  return {
    protocol,
    secure,
    subdomain: subdomain || '',
    domain: domain || '',
    fullDomain,
    data,
    url,
    path,
    route,
    queryString: qs,
    hashBang,
  };
};

const toQueryString = obj => obj && '?' + Object.entries(obj)
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(typeof v === 'string' ? v : JSON.stringify(v))}`)
  .join('&');

window.parseURL = parseURL;

export {
  parseURL,
  toQueryString,
};
