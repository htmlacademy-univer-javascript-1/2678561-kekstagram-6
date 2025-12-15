const state = {
  isModalOpen: false,
  currentPhoto: null,
  shownComments: 0,
  commentsPerPage: 5
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
  commentsLoader: document.querySelector('.comments-loader'),
  commentsCounter: document.querySelector('.social__comment-count .comments-count')
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

function updateCommentsCounter() {
  const totalComments = state.currentPhoto.comments.length;
  const shown = state.shownComments;

  elements.socialCommentCount.textContent = `${shown} из ${totalComments} комментариев`;
}

function loadMoreComments() {
  const totalComments = state.currentPhoto.comments.length;
  const nextCommentsCount = Math.min(
    state.shownComments + state.commentsPerPage,
    totalComments
  );

  for (let i = state.shownComments; i < nextCommentsCount; i++) {
    const comment = state.currentPhoto.comments[i];
    elements.socialComments.appendChild(createComment(comment));
  }

  state.shownComments = nextCommentsCount;
  updateCommentsCounter();

  if (state.shownComments >= totalComments) {
    elements.commentsLoader.classList.add('hidden');
  }
}

function onCommentsLoaderClick() {
  loadMoreComments();
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
  elements.commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function removeEventListeners() {
  document.removeEventListener('keydown', onEscKeyDown);
  elements.bigPicture.removeEventListener('click', onOverlayClick);
  elements.closeButton.removeEventListener('click', onCloseButtonClick);
  elements.commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

function openPhoto(photo) {
  if (state.isModalOpen) {
    return;
  }

  state.currentPhoto = photo;
  state.shownComments = 0;

  elements.bigPictureImg.src = photo.url;
  elements.bigPictureImg.alt = photo.description;
  elements.likesCount.textContent = photo.likes;
  elements.socialCaption.textContent = photo.description;
  elements.socialComments.innerHTML = '';

  elements.socialCommentCount.classList.remove('hidden');
  elements.commentsLoader.classList.remove('hidden');

  elements.commentsCount.textContent = photo.comments.length;

  loadMoreComments();

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

  state.currentPhoto = null;
  state.shownComments = 0;

  elements.bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  state.isModalOpen = false;
}

export { openPhoto };
