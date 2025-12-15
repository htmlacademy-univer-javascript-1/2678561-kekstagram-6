import { generatePhotosArray } from './modules/data/data.js';
import { writeMiniatures } from './modules/gallery/miniaturesWriter.js';
import { openPhoto } from './modules/gallery/postViewer.js';
import './modules/form/formValidator.js';
import './modules/form/formManager.js';

const photosArray = generatePhotosArray();
writeMiniatures(photosArray);

const picturesContainer = document.querySelector('.pictures');
const pictureElements = picturesContainer.querySelectorAll('.picture');

pictureElements.forEach((pictureElement, index) => {
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPhoto(photosArray[index]);
  });
});
