import {
  PHOTO_COUNT,
  MIN_LIKES,
  MAX_LIKES,
  DESCRIPTIONS
} from './constants.js';
import {
  getRandomInteger,
  generateComments
} from './util.js';

export const generatePhotosArray = () => {
  const photos = [];

  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i - 1] || `Фотография ${i}`,
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: generateComments()
    });
  }

  return photos;
};
