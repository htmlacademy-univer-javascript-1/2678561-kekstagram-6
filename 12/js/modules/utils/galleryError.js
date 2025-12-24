const showGalleryError = (message) => {
  const template = document
    .querySelector('#gallery-error')
    .content
    .cloneNode(true);

  const errorElement = template.querySelector('.gallery-error');
  const messageElement = template.querySelector('.gallery-error__message');
  messageElement.textContent = message;

  document.body.appendChild(template);

  function closeModal() {
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    errorElement.removeEventListener('click', onOverlayClick);
  }

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeModal();
    }
  }

  function onOverlayClick(evt) {
    if (evt.target === errorElement) {
      closeModal();
    }
  }

  document.addEventListener('keydown', onEscKeyDown);
  errorElement.addEventListener('click', onOverlayClick);

};

export { showGalleryError };
