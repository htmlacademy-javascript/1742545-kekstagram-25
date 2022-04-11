const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAG_COUNT = 5;

function validateHashtags(hashtagElement) {
  if (!hashtagElement) {
    return;
  }

  hashtagElement.setCustomValidity('');
  const hashtags = hashtagElement.value.trim();

  if (hashtags.length === 0) {
    return;
  }

  const arrayOfHashtags = hashtags.split(' ');

  const uniqueHashtags = {};

  for (let i = 0; i < arrayOfHashtags.length; i++) {
    if (arrayOfHashtags[i] === '') {
      hashtagElement.setCustomValidity('Нельзя больше одного пробела между хэштегами');
    } else {
      validateHashtagFormat(arrayOfHashtags[i], hashtagElement);

      validateHashtagUniqueness(uniqueHashtags, arrayOfHashtags[i].toLowerCase(), hashtagElement);
    }
  }

  validateHashtagCount(arrayOfHashtags, hashtagElement);
}

function validateHashtagFormat(currentHashtag, hashtagElement) {
  if (currentHashtag.length === 1 && currentHashtag === '#') {
    hashtagElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
  } else if (!HASHTAG_REGEXP.test(currentHashtag)) {
    hashtagElement.setCustomValidity('Хэш-тег начинается с символа #, не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., максимальная длина одного хэш-тега 20 символов, включая решётку.');
  }
}

function validateHashtagUniqueness(uniqueHashtags, hashtag, hashtagElement) {
  if (uniqueHashtags[hashtag] !== 1) {
    uniqueHashtags[hashtag] = 1;
  } else {
    hashtagElement.setCustomValidity('#ХэшТег и #хэштег считаются одним и тем же тегом, теги не должны повторяться.');
  }
}

function validateHashtagCount(arrayOfHashtags, hashtagElement) {
  if (arrayOfHashtags.length > MAX_HASHTAG_COUNT) {
    hashtagElement.setCustomValidity(`Хэш-тегов не должно быть больше, чем  ${MAX_HASHTAG_COUNT}`);
  }
}

export { validateHashtags };
