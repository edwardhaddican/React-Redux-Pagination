# Caesar Cipher

---

## Prompt
You are given a non-empty string of lowercase letters and a non-negative integer value representing a key.

Write a function that returns a new string obtained by shifting every letter in the string by the number of positions specified by the key.

Letters should wrap around the alphabet. So if 'y' needs to be shifted by 2, the new letter should be 'a'.

---

## Examples
```js
caesarCipher('cody', 2); // should return 'eqfa'
caesarCipher('donotfeedtheremotefellows', 5); // should return 'itstykjjiymjwjrtyjkjqqtbx'
```

---

## Solutions
The solutions will have time and space complexities of O(n) because we always need to go through the entire string and create a new string of the same length.

---

## The simple -- but just as optimal -- solution
```js
function caesarCipher(string, key) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let newStr = '';
  for (let i = 0; i < string.length; i++) {
    let currentLetterIdx = alphabet.indexOf(string[i]);
    let newIdx = (currentLetterIdx + key) % 26;
    newStr += alphabet[newIdx];
  }
  return newStr;
}
```

---

## More complicated solution
[ASCII char code chart](http://ee.hawaii.edu/~tep/EE160/Book/chap4/subsection2.1.1.1.html)

```js
function caesarCipher(string, key) {
  const newStr = '';
  const newKey = key % 26;
  for (const letter of string) {
    newStr += getNewLetter(letter, newKey);
  }
  return newStr;
}

function getNewLetter(letter, key) {
  // get the letter's char code and add the key
  const newLetterCode = letter.charCodeAt() + key;
  // lower case letters range is 97 (a) to 122 (z)
  return newLetterCode <= 122 ? String.fromCharCode(newLetterCode) : String.fromCharCode(96 + newLetterCode % 122);
}
```

---

## Interviewer tips
1. This is good modulo practice. If the interviewee is stuck figuring out how to make the key wrap back to the beginning of the alphabet, you can remind them about modulo.
2. There is a good chance your interviewee is unaware of ASCII and the charCodeAt() and fromCharCode() methods. Feel free to explain to them.
3. If the interviewee finishes with time to spare, try refactoring to account for uppercase letters.
