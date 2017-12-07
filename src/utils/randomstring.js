const alphaNumericRange = [];
const alphaRange = [];
const numericRange = [];
const lowerCaseRange = [];
const upperCaseRange = [];
const asciiPrintableRange = [];

for (let i = 32; i < 127; ++i) {
  asciiPrintableRange.push(i);
  if (i > 47 && i < 58) {
    alphaNumericRange.push(i);
    numericRange.push(i);
  }

  if (i > 64 && i < 91) {
    alphaNumericRange.push(i);
    alphaRange.push(i);
    upperCaseRange.push(i);
  }

  if (i > 96 && i < 123) {
    alphaNumericRange.push(i);
    alphaRange.push(i);
    lowerCaseRange.push(i);
  }
}

const getRandomCharacter = range => () => {
  return String.fromCharCode(range[Math.random() * range.length | 0]);
};

const randomAlphaNum = getRandomCharacter(alphaNumericRange);
const randomASCII = getRandomCharacter(asciiPrintableRange);
const randomDigit = getRandomCharacter(numericRange);
const randomAlpha = getRandomCharacter(alphaRange);
const randomLower = getRandomCharacter(lowerCaseRange);
const randomUpper = getRandomCharacter(upperCaseRange);

const randomString = f => (length=32) => {
  let str = '';
  for (let i = 0; i < length; ++i) str += f();
  return str;
};

const anum = randomString(randomAlphaNum);
const ascii = randomString(randomASCII);
const alpha = randomString(randomAlpha);
const numeric = randomString(randomDigit);
const upper = randomString(randomUpper);
const lower = randomString(randomLower);

export default anum;
export {
  anum as alphanumeric,
  ascii,
  alpha,
  numeric,
  upper,
  lower
};
