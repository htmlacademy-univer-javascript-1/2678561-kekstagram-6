import { openPhoto } from '../gallery/postViewer.js';

const setPreviewListeners = (photosArray) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureElements = picturesContainer.querySelectorAll('.picture');

  pictureElements.forEach((pictureElement, index) => {
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhoto(photosArray[index]);
    });
  });
};

export { setPreviewListeners };
