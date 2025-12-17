import { pristine } from './formValidator.js';
import {
  MAX_FILE_SIZE,
  VALID_EXTENSIONS,
  SCALE_STEP,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_DEFAULT
} from '../data/constants.js';
import {
  createSlider,
  onEffectChange,
  resetEffects
} from './photoEffectsManager.js';

const uploadForm = document.getElementById('upload-select-image');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const body = document.body;
const submitButton = uploadForm.querySelector('#upload-submit');

const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');

const effectLevel = uploadForm.querySelector('.effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');

let currentImageUrl = null;

function renderSelectedImage() {
  const file = uploadInput.files[0];

  if (!file) {
    return false;
  }
  if (!file.type.startsWith('image/')) {
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    return false;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!VALID_EXTENSIONS.includes(fileExtension)) {
    return false;
  }
  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
  }

  currentImageUrl = URL.createObjectURL(file);

  imagePreview.src = currentImageUrl;
  imagePreview.alt = 'Предварительный просмотр загруженной фотографии';

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${currentImageUrl})`;
  });

  return true;
}

function showUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function hideUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
}

function resetForm() {
  uploadInput.value = '';

  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
    currentImageUrl = null;
  }

  uploadForm.reset();
  pristine.reset();

  updateScale(SCALE_DEFAULT);

  resetEffects(uploadForm, effectLevelSlider, effectLevel, effectLevelValue, imagePreview);

  imagePreview.src = 'img/upload-default-image.jpg';
  imagePreview.alt = 'Предварительный просмотр фотографии';

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
}

function onDocumentKeydown(evt) {
  if (
    evt.key === 'Escape' &&
    !evt.target.closest('.text__hashtags') &&
    !evt.target.closest('.text__description')
  ) {
    evt.preventDefault();
    hideUploadForm();
  }
}

uploadInput.addEventListener('change', () => {
  if (uploadInput.files.length > 0) {
    const isImageLoaded = renderSelectedImage();
    if (isImageLoaded) {
      showUploadForm();
    } else {
      resetForm();
    }
  }
});

uploadCancel.addEventListener('click', () => {
  hideUploadForm();
});

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
});

function updateScale(value) {
  scaleValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
}

function onScaleSmallerClick() {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, SCALE_MIN);
  updateScale(newValue);
}

function onScaleBiggerClick() {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, SCALE_MAX);
  updateScale(newValue);
}

function init() {
  updateScale(SCALE_DEFAULT);

  createSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview);

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  effectsList.addEventListener('change', (evt) => {
    onEffectChange(evt, effectLevelSlider, effectLevel, effectLevelValue, imagePreview);
  });
}

init();

export { showUploadForm, hideUploadForm, resetForm };
