const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const uploadForm = document.getElementById('upload-select-image');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

let lastValidationCache = { value: null, result: null };

const validateHashtagsWithError = (value) => {
  if (lastValidationCache.value === value) {
    return lastValidationCache.result;
  }

  const inputValue = value.replace(/\s+/g, ' ').trim();

  if (!inputValue) {
    const result = { isValid: true, error: '' };
    lastValidationCache = { value, result };
    return result;
  }

  const hashtags = inputValue.split(/\s+/);

  if (hashtags.length > HASHTAG_MAX_COUNT) {
    const result = {
      isValid: false,
      error: `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэш-тегов`
    };
    lastValidationCache = { value, result };
    return result;
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#')) {
      const result = {
        isValid: false,
        error: 'Хэш-тег должен начинаться с символа #'
      };
      lastValidationCache = { value, result };
      return result;
    }
    if (hashtag === '#') {
      const result = {
        isValid: false,
        error: 'Хэш-тег не может состоять только из решётки'
      };
      lastValidationCache = { value, result };
      return result;
    }
    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      const result = {
        isValid: false,
        error: 'Максимальная длина хэш-тега 20 символов'
      };
      lastValidationCache = { value, result };
      return result;
    }
    if (!HASHTAG_PATTERN.test(hashtag)) {
      const result = {
        isValid: false,
        error: 'Хэш-тег содержит недопустимые символы. Разрешены только буквы и цифры'
      };
      lastValidationCache = { value, result };
      return result;
    }
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    const result = {
      isValid: false,
      error: 'Один и тот же хэш-тег не может быть использован дважды'
    };
    lastValidationCache = { value, result };
    return result;
  }

  const totalResult = { isValid: true, error: '' };
  lastValidationCache = { value, totalResult };
  return totalResult;
};

const validateHashtags = (value) => validateHashtagsWithError(value).isValid;
const getHashtagErrorMessage = (value) => validateHashtagsWithError(value).error;

const validateComment = (value) => value.trim().length <= COMMENT_MAX_LENGTH;

const pristine = new window.Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

pristine.addValidator(hashtagField, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(
  commentField,
  validateComment,
  `Длина комментария не может превышать ${COMMENT_MAX_LENGTH} символов`
);

const cancelEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

hashtagField.addEventListener('keydown', cancelEscHandler);
commentField.addEventListener('keydown', cancelEscHandler);

export { pristine };
