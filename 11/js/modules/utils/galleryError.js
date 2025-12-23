const showGalleryError = (message) => {
  const template = document
    .querySelector('#gallery-error')
    .content
    .cloneNode(true);
  template.querySelector('.gallery-error__message').textContent = message;
  document.body.appendChild(template);
};

export { showGalleryError };
