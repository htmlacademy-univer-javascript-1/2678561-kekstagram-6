function checkLength(str, maxLen) {
  return str.length <= maxLen;
}

function isPalindrome(str) {
  let p1 = 0;
  let p2 = str.length - 1;
  while (p1 < p2) {
    if (str[p1] == " ") p1++;
    if (str[p2] == " ") p2--;
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
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i]))) {
      result += str[i];
    }
  }
  return Number(result);
}
