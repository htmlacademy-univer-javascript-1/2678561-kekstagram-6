export const PHOTO_COUNT = 25;
export const MIN_LIKES = 15;
export const MAX_LIKES = 200;
export const MIN_COMMENTS = 0;
export const MAX_COMMENTS = 30;
export const MIN_AVATAR_ID = 1;
export const MAX_AVATAR_ID = 6;
export const MIN_COMMENT_ID = 1;
export const MAX_COMMENT_ID = 1000;

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const NAMES = [
  'Кирилл', 'Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Иван', 'Ольга', 'Алексей', 'Наталья'
];

export const DESCRIPTIONS = [
  'Слово — не воробей. Вообще ничто не воробей, кроме самого воробья.',
  'Если закрыть глаза, становится темно.',
  'Кто рано встаёт — тому весь день спать хочется.',
  'Если заблудился в лесу, иди домой.',
  'Мама учила не ругаться матом, но жизнь научила не ругаться матом при маме.',
  'Баобаб',
  'Всем здравствуйте',
  'Ayo whats up',
  'Всем привет',
  'Игра света и тени',
  'Простое совершенство',
  'Взгляд из окна',
  'Дорога в неизвестность',
  'Симфония цветов',
  'Застывшее время',
  'Эмоции в кадре',
  'Гармония природы',
  'Уличное искусство',
  'Отражение реальности',
  'Мгновение жизни',
  'Красота в деталях',
  'Путешествие мечты',
  'Вдохновение вокруг',
  'Случайная встреча',
  'Памятный момент'
];

export const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
export const HASHTAG_MAX_COUNT = 5;
export const HASHTAG_MAX_LENGTH = 20;
export const COMMENT_MAX_LENGTH = 140;

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const VALID_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const SCALE_STEP = 25;
export const SCALE_MIN = 25;
export const SCALE_MAX = 100;
export const SCALE_DEFAULT = 55;

export const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

export const URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

