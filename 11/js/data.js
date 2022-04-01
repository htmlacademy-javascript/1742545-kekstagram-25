// import { getRandomNumber } from './util.js';

// const comments = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];
// const names = ['Иван', 'Александр', 'Сергей', 'Алексей', 'Павел', 'Никита', 'Дмитрий', 'Ольга', 'Екатерина', 'Полина'];
// const descriptions = ['Море', 'Машина', 'Еда', 'Пальмы', 'Пляж'];
// let currentId = 0;
// let commentId = 100;

// function createComments() {
//   return {
//     id: ++commentId,
//     avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
//     message: Array.from({length: getRandomNumber(1, 2)}, () => comments[getRandomNumber(0, comments.length - 1)]).join(' '),
//     name: names[getRandomNumber(0, names.length - 1)],
//   };
// }

// function buildPhotoDescription() {
//   return {
//     id: ++currentId,
//     url: `photos/${currentId}.jpg`,
//     likes: getRandomNumber(15, 200),
//     description: descriptions[getRandomNumber(0, descriptions.length -1)],
//     comments: Array.from({length: getRandomNumber(0, 20)}, createComments),
//   };
// }

// const photoContent = Array.from({length: 25}, buildPhotoDescription);

// export { photoContent };
