import { filterStates } from '../data/constants.js';
import { filterTenRandomPhotos, filterMostDiscussedPhotos } from '../gallery/miniaturesFilter.js';
import { writeMiniatures } from '../gallery/miniaturesWriter.js';
import { setPreviewListeners } from '../utils/previewListenersSetter.js';
import { debounce } from './callRateLimiter.js';

let currentFilterState = filterStates.DEFAULT;

const renderPhotos = (photos) => {
  writeMiniatures(photos);
  setPreviewListeners(photos);
};

const debouncedRenderPhotos = debounce(renderPhotos, 500);
const initPhotoFilters = (photosArray) => {
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  const filterDefault = document.querySelector('#filter-default');
  const filterRandom = document.querySelector('#filter-random');
  const filterDiscussed = document.querySelector('#filter-discussed');

  let currentFilterButton = filterDefault;

  const setActiveButton = (button, state) => {
    if (currentFilterState === state) {
      return;
    }

    currentFilterButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');

    currentFilterButton = button;
    currentFilterState = state;
  };

  filterDefault.addEventListener('click', () => {
    setActiveButton(filterDefault, filterStates.DEFAULT);
    debouncedRenderPhotos(photosArray);
  });

  filterRandom.addEventListener('click', () => {
    setActiveButton(filterRandom, filterStates.RANDOM);
    debouncedRenderPhotos(filterTenRandomPhotos(photosArray));
  });

  filterDiscussed.addEventListener('click', () => {
    setActiveButton(filterDiscussed, filterStates.DISCUSSED);
    debouncedRenderPhotos(filterMostDiscussedPhotos(photosArray));
  });
};

export { initPhotoFilters };
