import { getData } from './modules/api/api.js';
import { writeMiniatures } from './modules/gallery/miniaturesWriter.js';
import { showGalleryError } from './modules/utils/galleryError.js';
import { setPreviewListeners } from './modules/utils/previewListenersSetter.js';
import './modules/form/formValidator.js';
import './modules/form/formManager.js';

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
