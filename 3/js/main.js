const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Кирилл', 'Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Иван', 'Ольга', 'Алексей', 'Наталья'];

const DESCRIPTIONS = [
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

const generateComment = () => {
  const messageCount = getRandomInteger(1, 2);
  let message = '';
  for (let i = 0; i < messageCount; i++) {
    const randomMessageIndex = getRandomInteger(0, MESSAGES.length - 1);
    message += (i > 0 ? ' ' : '') + MESSAGES[randomMessageIndex];
  }
  return {
    id: getRandomInteger(1, 1000),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
};

const generateComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  const usedIds = new Set();
  for (let i = 0; i < commentsCount; i++) {
    let comment;
    do {
      comment = generateComment();
    } while (usedIds.has(comment.id));
    usedIds.add(comment.id);
    comments.push(comment);
  }
  return comments;
};

const generatePhotosArray = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i - 1],
      likes: getRandomInteger(15, 200),
      comments: generateComments()
    });
  }
  return photos;
};

const photosArray = generatePhotosArray();

export {photosArray};
