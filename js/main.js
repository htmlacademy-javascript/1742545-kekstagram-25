function randomNumber(from, to) {
  if (from < 0 || to < 0 || to <= from) {
    throw new Error('Ошибка, некорректные данные!');
  }
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function maxStringLength(str, maxLength) {
  return str.length <= maxLength;
}

randomNumber(1, 10);
maxStringLength('Hello World', 11);

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Иван', 'Александр', 'Сергей', 'Алексей', 'Павел', 'Никита', 'Дмитрий', 'Ольга', 'Екатерина', 'Полина'];
const descriptions = ['Море', 'Машина', 'Еда', 'Пальмы', 'Пляж'];
let currentId = 0;
let commentId = 100;

function createComments() {
  return [
    {
      id: ++commentId,
      avatar: `img/avatar/${randomNumber(1, 6)}.svg`,
      message: Array.from({length: randomNumber(1,2)}, () => comments[randomNumber(0, comments.length - 1)]).join(' '),
      name: names[randomNumber(0, names.length - 1)],
    },
    {
      id: ++commentId,
      avatar: `img/avatar/${randomNumber(1, 6)}.svg`,
      message: Array.from({length: randomNumber(1,2)}, () => comments[randomNumber(0, comments.length - 1)]).join(' '),
      name: names[randomNumber(0, names.length - 1)],
    }
  ]
}

function buildPhotoDescription() {
  return {
    id: ++currentId,
    url: `photos/${currentId}.jpg`,
    likes: randomNumber(15, 200),
    description: descriptions[randomNumber(0, descriptions.length -1)],
    comments: createComments(),
  };
}
const photoContent = Array.from({length: 25}, buildPhotoDescription);
photoContent();
