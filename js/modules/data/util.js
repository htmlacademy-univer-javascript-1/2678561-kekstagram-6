import {
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_AVATAR_ID,
  MAX_AVATAR_ID,
  MESSAGES,
  NAMES
} from './constants.js';

export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export const generateCommentId = createIdGenerator();

export const generateComment = () => {
  const messageCount = getRandomInteger(1, 2);
  let message;

  if (messageCount === 1) {
    const randomIndex = getRandomInteger(0, MESSAGES.length - 1);
    message = MESSAGES[randomIndex];
  } else {
    const firstIndex = getRandomInteger(0, MESSAGES.length - 1);
    const availableSentencesIndices = [];
    for (let i = 0; i < MESSAGES.length; i++) {
      if (i !== firstIndex) {
        availableSentencesIndices.push(i);
      }
    }
    const secondIndex = availableSentencesIndices[getRandomInteger(0, availableSentencesIndices.length - 1)];
    message = `${MESSAGES[firstIndex]} ${MESSAGES[secondIndex]}`;
  }

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: message,
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
};

export const generateComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return comments;
};
