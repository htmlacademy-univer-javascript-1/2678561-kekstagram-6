let isModalOpen = false;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let escKeyHandler = null;
let overlayClickHandler = null;
let closeButtonClickHandler = null;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
};

function addEventListeners() {
  if (isModalOpen) {
    return;
  }

  escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePhoto();
    }
  };
  document.addEventListener('keydown', escKeyHandler);

  overlayClickHandler = (evt) => {
    if (evt.target === bigPicture) {
      closePhoto();
    }
  };
  bigPicture.addEventListener('click', overlayClickHandler);

  closeButtonClickHandler = closePhoto;
  closeButton.addEventListener('click', closeButtonClickHandler);

  isModalOpen = true;
}

function removeEventListeners() {
  if (!isModalOpen) {
    return;
  }

  if (escKeyHandler) {
    document.removeEventListener('keydown', escKeyHandler);
    escKeyHandler = null;
  }

  if (overlayClickHandler) {
    bigPicture.removeEventListener('click', overlayClickHandler);
    overlayClickHandler = null;
  }

  if (closeButtonClickHandler) {
    closeButton.removeEventListener('click', closeButtonClickHandler);
    closeButtonClickHandler = null;
  }

  isModalOpen = false;
}

const openPhoto = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialComments.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  socialComments.appendChild(commentsFragment);

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  addEventListeners();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closePhoto() {
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeEventListeners();
}

export { openPhoto };
