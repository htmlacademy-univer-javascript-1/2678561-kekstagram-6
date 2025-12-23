import { getData } from './modules/api/api.js';
import { writeMiniatures } from './modules/gallery/miniaturesWriter.js';
import { openPhoto } from './modules/gallery/postViewer.js';
import { showErrorAlert } from './modules/utils/functions.js';
import './modules/form/formValidator.js';
import './modules/form/formManager.js';

const loadPhotos = async () => {
  try {
    const photosArray = await getData();
    writeMiniatures(photosArray);

    const picturesContainer = document.querySelector('.pictures');
    const pictureElements = picturesContainer.querySelectorAll('.picture');

    pictureElements.forEach((pictureElement, index) => {
      pictureElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        openPhoto(photosArray[index]);
      });
    });
  } catch (error) {
    showErrorAlert('Не удалось загрузить фотографии. Пожалуйста, обновите страницу.');
  }
};

loadPhotos();
