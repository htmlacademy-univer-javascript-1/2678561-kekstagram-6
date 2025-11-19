function checkLength(str, maxLen) {
  return str.length <= maxLen;
}

function isPalindrome(str) {
  let p1 = 0;
  let p2 = str.length - 1;
  while (p1 < p2) {
    if (str[p1] === ' ') {
      p1++;
    }
    if (str[p2] === ' ') {
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
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      result += str[i];
    }
  }
  return result === '' ? NaN : Number(result);
}

checkLength('проверяемая строка', 20);      // true
checkLength('проверяемая строка', 18);      // true
checkLength('проверяемая строка', 10);      // false

isPalindrome('топот');                      // true
isPalindrome('ДовОд');                      // true
isPalindrome('Кекс');                       // false
isPalindrome('Лёша на полке клопа нашёл '); // true

getNumber('2023 год');                      // 2023
getNumber('ECMAScript 2022');               // 2022
getNumber('1 кефир, 0.5 батона');           // 105
getNumber('агент 007');                     // 7
getNumber('а я томат');                     // NaN
getNumber(2023);                            // 2023
getNumber(-1);                              // 1
getNumber(1.5);                             // 15
