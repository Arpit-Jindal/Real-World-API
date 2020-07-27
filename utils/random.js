const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function genRandomString(length) {
  let buff = [];
  while (buff.length < length) {
    const charCode = parseInt(Math.random() * (ALPHABET.length - 1));
    buff.push(ALPHABET.charAt(charCode));
    // buff.push(ALPHABET[charCode]); //same thing as above
  }
  return buff.join("");
}

module.exports = { genRandomString };
