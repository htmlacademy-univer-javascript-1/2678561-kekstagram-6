function checkLength(str, maxLen) {
  return str.length <= maxLen;
}

function isPalindrome(str) {
  let p1 = 0;
  let p2 = str.length - 1;
  while (p1 < p2) {
    if (str[p1] === " ") {
      p1++;
    }
    if (str[p2] === " ") {
      p2--;
    }
    if (str[p1].toLowerCase() !== str[p2].toLowerCase()) {
      return false;
    }
    p1++;
    p2--;
  }
  return true;
}

function getNumber(input) {
  const str = input.toString();
  let result = "
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      result += str[i];
    }
  }
  return result === "" ? NaN : Number(result);
}

console.log(checkLength("проверяемая строка", 20));      // true
console.log(checkLength("проверяемая строка", 18));      // true
console.log(checkLength("проверяемая строка", 10));      // false

console.log(isPalindrome("топот"));                      // true
console.log(isPalindrome("ДовОд"));                      // true
console.log(isPalindrome("Кекс"));                       // false
console.log(isPalindrome("Лёша на полке клопа нашёл ")); // true

console.log(getNumber("2023 год"));                      // 2023
console.log(getNumber("ECMAScript 2022"));               // 2022
console.log(getNumber("1 кефир, 0.5 батона"));           // 105
console.log(getNumber("агент 007"));                     // 7
console.log(getNumber("а я томат"));                     // NaN
console.log(getNumber(2023));                            // 2023
console.log(getNumber(-1));                              // 1
console.log(getNumber(1.5));                             // 15
