import {
  HASHTAG_PATTERN,
  HASHTAG_MAX_COUNT,
  HASHTAG_MAX_LENGTH,
  COMMENT_MAX_LENGTH
} from '../data/constants.js';

const uploadForm = document.getElementById('upload-select-image');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const validateHashtagsWithError = (value) => {
  const inputValue = value.replace(/\s+/g, ' ').trim();

  if (!inputValue) {
    return { isValid: true, error: '' };
  }

  const hashtags = inputValue.split(' ');

  if (hashtags.length > HASHTAG_MAX_COUNT) {
    return {
      isValid: false,
      error: `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэш-тегов`
    };
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    return {
      isValid: false,
      error: 'Один и тот же хэш-тег не может быть использован дважды'
    };
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#')) {
      return {
        isValid: false,
        error: 'Хэш-тег должен начинаться с символа #'
      };
    }

    if (hashtag === '#') {
      return {
        isValid: false,
        error: 'Хэш-тег не может состоять только из решётки'
      };
    }

    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      return {
        isValid: false,
        error: 'Максимальная длина хэш-тега 20 символов'
      };
    }

    if (!HASHTAG_PATTERN.test(hashtag)) {
      return {
        isValid: false,
        error: 'Хэш-тег содержит недопустимые символы'
      };
    }
  }

  return { isValid: true, error: '' };
};


const validateHashtags = (value) => {
  const result = validateHashtagsWithError(value);
  return result ? result.isValid : false;
};

const getHashtagErrorMessage = (value) => {
  const result = validateHashtagsWithError(value);
  return result ? result.error : '';
};

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

const validateForm = () => pristine.validate();

export { pristine, validateForm };
