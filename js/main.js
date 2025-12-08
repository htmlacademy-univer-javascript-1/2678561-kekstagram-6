import { generatePhotosArray } from './data.js';
import { writeMiniatures } from './miniaturesWriter.js';
import { openPhoto } from './postViewer.js';

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
