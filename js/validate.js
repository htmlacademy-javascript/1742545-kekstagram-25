const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAG_COUNT = 5;

function validateHashtags(hashtagElement) {
  const hashtags = hashtagElement.value.trim();
  hashtagElement.setCustomValidity('');

  if (hashtags.length !== 0) {
    const arrayOfHashtags = hashtags.split(' ');

    const unique = {};
    let hashtagCount = 0;

    for (let i = 0; i < arrayOfHashtags.length; i++) {
      if (arrayOfHashtags[i] === '') {
        hashtagElement.setCustomValidity('Нельзя больше одного пробела между хэштегами');
      } else {
        validateHashtagFormat(arrayOfHashtags[i], hashtagElement);

        hashtagCount++;

        validateHastagUniqueness(unique, arrayOfHashtags, i, hashtagElement);
      }
    }

    validateHashtagCount(hashtagCount, hashtagElement);
  }
}

function validateHashtagFormat(currentHashtag, hashtagElement) {
  if (currentHashtag.length === 1 && (currentHashtag === '#')) {
    hashtagElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
  } else if (!RE.test(currentHashtag)) {
    hashtagElement.setCustomValidity('Хэш-тег начинается с символа #, не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., максимальная длина одного хэш-тега 20 символов, включая решётку.');
  }
}

function validateHastagUniqueness(unique, arrayOfHashtags, i, hashtagElement) {
  if (unique[arrayOfHashtags[i].toLowerCase()] !== 1) {
    unique[arrayOfHashtags[i].toLowerCase()] = 1;
  } else {
    hashtagElement.setCustomValidity('#ХэшТег и #хэштег считаются одним и тем же тегом, теги не должны повторяться.');
  }
}

function validateHashtagCount(hashtagCount, hashtagElement) {
  if (hashtagCount > MAX_HASHTAG_COUNT) {
    hashtagElement.setCustomValidity(`Хэш-тегов не должно быть больше, чем  ${MAX_HASHTAG_COUNT}`);
  }
}

export {validateHashtags};
