const showAlert = (message, type = 'error') => {
  const alertTemplate = document.querySelector(`#${type}`).content.cloneNode(true);
  const alertElement = alertTemplate.querySelector(`.${type}`);
  const alertMessage = alertElement.querySelector(`.${type}__message`);

  if (alertMessage) {
    alertMessage.textContent = message;
  }

  function onEscapeKeyDown(evt) {
    if (evt.key === 'Escape') {
      closeAlert();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(`.${type}__inner`)) {
      closeAlert();
    }
  }

  function closeAlert() {
    alertElement.remove();
    document.removeEventListener('keydown', onEscapeKeyDown);
    alertElement.removeEventListener('click', onOutsideClick);
  }

  const closeButton = alertElement.querySelector(`.${type}__button`);
  if (closeButton) {
    closeButton.addEventListener('click', closeAlert);
  }

  document.addEventListener('keydown', onEscapeKeyDown);
  alertElement.addEventListener('click', onOutsideClick);

  document.body.appendChild(alertElement);
};

const showSuccessAlert = (message) => {
  showAlert(message, 'success');
};

const showErrorAlert = (message) => {
  showAlert(message, 'error');
};

function checkLength(str, maxLen) {
  return str.length <= maxLen;
}

function isPalindrome(str) {
  let p1 = 0;
  let p2 = str.length - 1;
  while (p1 < p2) {
    if (str[p1] === ' ') {
      p1++;
      continue;
    }
    if (str[p2] === ' ') {
      p2--;
      continue;
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

const toMins = (timeString) => {
  const [hours = 0, minutes = 0] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingInTime = (startWorkDay, endWorkDay, startMeeting, duration) => {
  const startWorkMinutes = toMins(startWorkDay);
  const endWorkMinutes = toMins(endWorkDay);
  const startMeetingMinutes = toMins(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startWorkMinutes &&
         endMeetingMinutes <= endWorkMinutes;
};


checkLength('проверяемая строка', 20);          // true
checkLength('проверяемая строка', 18);          // true
checkLength('проверяемая строка', 10);          // false

isPalindrome('топот');                          // true
isPalindrome('ДовОд');                          // true
isPalindrome('Кекс');                           // false
isPalindrome('Лёша на полке клопа нашёл ');     // true
isPalindrome('a  ');                            // true

getNumber('2023 год');                          // 2023
getNumber('ECMAScript 2022');                   // 2022
getNumber('1 кефир, 0.5 батона');               // 105
getNumber('агент 007');                         // 7
getNumber('а я томат');                         // NaN
getNumber(2023);                                // 2023
getNumber(-1);                                  // 1
getNumber(1.5);                                 // 15

isMeetingInTime('08:00', '17:30', '14:00', 90); // true
isMeetingInTime('8:0', '10:0', '8:0', 120);     // true
isMeetingInTime('08:00', '14:30', '14:00', 90); // false
isMeetingInTime('14:00', '17:30', '08:0', 90);  // false
isMeetingInTime('8:00', '17:30', '08:00', 900); // false

export { showSuccessAlert, showErrorAlert };
