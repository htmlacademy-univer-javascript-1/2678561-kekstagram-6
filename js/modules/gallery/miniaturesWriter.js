const clearMiniatures = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');

  pictures.forEach((picture) => picture.remove());
};

export const writeMiniatures = (photosArray) => {
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  clearMiniatures();

  photosArray.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    const img = picture.querySelector('.picture__img');

    img.src = photo.url;
    img.alt = photo.description;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picturesFragment.appendChild(picture);
  });

  picturesContainer.appendChild(picturesFragment);
};
