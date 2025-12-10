const state = {
  isModalOpen: false,
  escKeyHandler: null,
  overlayClickHandler: null
};

const elements = {
  bigPicture: document.querySelector('.big-picture'),
  bigPictureImg: document.querySelector('.big-picture__img img'),
  likesCount: document.querySelector('.likes-count'),
  commentsCount: document.querySelector('.comments-count'),
  socialComments: document.querySelector('.social__comments'),
  socialCaption: document.querySelector('.social__caption'),
  closeButton: document.querySelector('.big-picture__cancel'),
  socialCommentCount: document.querySelector('.social__comment-count'),
  commentsLoader: document.querySelector('.comments-loader')
};

function createComment(comment) {
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
}

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhoto();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target === elements.bigPicture) {
    closePhoto();
  }
};

const onCloseButtonClick = () => {
  closePhoto();
};

function addEventListeners() {
  document.addEventListener('keydown', onEscKeyDown);
  elements.bigPicture.addEventListener('click', onOverlayClick);
  elements.closeButton.addEventListener('click', onCloseButtonClick);
}

function removeEventListeners() {
  document.removeEventListener('keydown', onEscKeyDown);
  elements.bigPicture.removeEventListener('click', onOverlayClick);
  elements.closeButton.removeEventListener('click', onCloseButtonClick);
}

function openPhoto(photo) {
  if (state.isModalOpen) {
    return;
  }

  elements.bigPictureImg.src = photo.url;
  elements.bigPictureImg.alt = photo.description;
  elements.likesCount.textContent = photo.likes;
  elements.commentsCount.textContent = photo.comments.length;
  elements.socialCaption.textContent = photo.description;
  elements.socialComments.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  elements.socialComments.appendChild(commentsFragment);

  elements.socialCommentCount.classList.add('hidden');
  elements.commentsLoader.classList.add('hidden');

  addEventListeners();

  elements.bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  state.isModalOpen = true;
}

function closePhoto() {
  if (!state.isModalOpen) {
    return;
  }

  removeEventListeners();

  elements.socialCommentCount.classList.remove('hidden');
  elements.commentsLoader.classList.remove('hidden');

  elements.bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  state.isModalOpen = false;
}

export { openPhoto };
