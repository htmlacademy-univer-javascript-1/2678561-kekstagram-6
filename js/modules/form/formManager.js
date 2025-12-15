import { pristine } from './formValidator.js';

const uploadForm = document.getElementById('upload-select-image');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const body = document.body;
const submitButton = uploadForm.querySelector('#upload-submit');

const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const VALID_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

let currentImageUrl = null;

const renderSelectedImage = () => {
  const file = uploadInput.files[0];
  
  if (!file) {
    return false;
  }
  if (!file.type.startsWith('image/')) {
    alert('Пожалуйста, выберите файл изображения');
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    alert('Файл слишком большой. Максимальный размер: 100MB');
    return false;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!VALID_EXTENSIONS.includes(fileExtension)) {
    alert('Пожалуйста, выберите файл в формате JPG, JPEG, PNG, GIF или WebP');
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
};

const showUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const resetForm = () => {
  uploadInput.value = '';

  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
    currentImageUrl = null;
  }

  uploadForm.reset();
  pristine.reset();

  imagePreview.src = 'img/upload-default-image.jpg';
  imagePreview.alt = 'Предварительный просмотр фотографии';

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    hideUploadForm();
  }
};

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

export { showUploadForm, hideUploadForm, resetForm };