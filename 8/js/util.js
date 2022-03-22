function getRandomNumber(from, to) {
  if (from < 0 || to < 0 || to <= from) {
    throw new Error('Ошибка, некорректные данные!');
  }
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function maxStringLength(str, maxLength) {
  return str.length <= maxLength;
}

maxStringLength('Hello World', 11);

export {getRandomNumber, maxStringLength};

