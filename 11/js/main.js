import { getData } from './modules/api/api.js';
import { writeMiniatures } from './modules/gallery/miniaturesWriter.js';
import { openPhoto } from './modules/gallery/postViewer.js';
import { showGalleryError } from './modules/utils/galleryError.js';
import './modules/form/formValidator.js';
import './modules/form/formManager.js';

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

const loadPhotos = async () => {
  let photosArray;

  try {
    photosArray = await getData();
  } catch (error) {
    showGalleryError(error.message);
    return;
  }

  writeMiniatures(photosArray);
  setPreviewListeners(photosArray);
};

loadPhotos();
