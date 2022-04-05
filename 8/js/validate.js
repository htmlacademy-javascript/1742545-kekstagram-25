const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAG_COUNT = 5;

function validateHashtags(hashtagElement) {
  const hashtags = hashtagElement.value.trim();
  hashtagElement.setCustomValidity('');

  if (hashtags.length === 0) {
    return;
  }
  const arrayOfHashtags = hashtags.split(' ');

  const unique = {};

  for (let i = 0; i < arrayOfHashtags.length; i++) {
    if (arrayOfHashtags[i] === '') {
      hashtagElement.setCustomValidity('Нельзя больше одного пробела между хэштегами');
    } else {
      validateHashtagFormat(arrayOfHashtags[i], hashtagElement);

      validateHastagUniqueness(unique, arrayOfHashtags[i].toLowerCase(), hashtagElement);
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

function validateHastagUniqueness(unique, hashtag, hashtagElement) {
  if (unique[hashtag] !== 1) {
    unique[hashtag] = 1;
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