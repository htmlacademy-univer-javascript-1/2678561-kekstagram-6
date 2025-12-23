const showAlert = (message, type = 'error') => {
  const alertTemplate = document.querySelector(`#${type}`).content.cloneNode(true);
  const alertElement = alertTemplate.querySelector(`.${type}`);
  const alertMessage = alertElement.querySelector(`.${type}__message`);

  if (alertMessage) {
    alertMessage.textContent = message;
  }

  function onEscapeKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
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
    document.removeEventListener('keydown', onEscapeKeyDown, true);
    alertElement.removeEventListener('click', onOutsideClick);
  }

  const closeButton = alertElement.querySelector(`.${type}__button`);
  if (closeButton) {
    closeButton.addEventListener('click', closeAlert);
  }

  document.addEventListener('keydown', onEscapeKeyDown, true);
  alertElement.addEventListener('click', onOutsideClick);

  const uploadOverlay = document.querySelector('.img-upload__overlay');

  if (uploadOverlay && !uploadOverlay.classList.contains('hidden')) {
    alertElement.style.position = 'fixed';
    alertElement.style.zIndex = '9999';
    document.body.appendChild(alertElement);
  } else {
    document.body.appendChild(alertElement);
  }
};

const showSuccessAlert = (message) => {
  showAlert(message, 'success');
};

const showErrorAlert = (message) => {
  showAlert(message, 'error');
};

export { showSuccessAlert, showErrorAlert };
