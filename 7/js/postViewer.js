const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const overlay = bigPicture;

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

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

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', closePhoto);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closePhoto();
  }
});

const handleOverlayClick = (evt) => {
  if (evt.target === overlay) {
    closePhoto();
  }
};

overlay.addEventListener('click', handleOverlayClick);

export { openPhoto };
