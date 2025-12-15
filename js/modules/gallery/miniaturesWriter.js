export const writeMiniatures = (photosArray) => {
  const picturesFragment = document.createDocumentFragment();

  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  photosArray.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').alt = photo.description;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picturesFragment.appendChild(picture);
  });

  document.querySelector('.pictures').appendChild(picturesFragment);
};
