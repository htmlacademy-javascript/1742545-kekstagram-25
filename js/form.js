const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagElement = document.querySelector('.text__hashtags');
const formUploadElement = document.querySelector('#upload-select-image');
const comment = document.querySelector('.text__description');
const MAX_HASHTAG_NUMBERS = 5;

function editImage(evt) {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__preview img').src = window.URL.createObjectURL(evt.currentTarget.files[0]);
  uploadCancel.addEventListener('click', onModalClose);
  document.addEventListener('keyup', onEscapeClick);
}

uploadFile.addEventListener('change', editImage);
formUploadElement.addEventListener('input', onUploadForm);

function onModalClose() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keyup', onEscapeClick);
  uploadCancel.removeEventListener('click', onModalClose);
  cleanUploadFile();
}

function onEscapeClick(evt) {
  if (evt.key === 'Escape' && (comment !== document.activeElement) && (hashtagElement !== document.activeElement)) {
    evt.preventDefault();
    onModalClose();
    cleanUploadFile();
  }
}

function validateHashtag (currentHashtag) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if (currentHashtag.length === 1 && (currentHashtag === '#')) {
    hashtagElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
  }
  else if (!re.test(currentHashtag)) {
    hashtagElement.setCustomValidity('Хэш-тег начинается с символа #, не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., максимальная длина одного хэш-тега 20 символов, включая решётку.');
  }
}

function  onUploadForm () {
  const hashtags = hashtagElement.value.trim();
  if (hashtags.length === 0) {
    hashtagElement.setCustomValidity('');
  } else {
    hashtagElement.setCustomValidity('');
    const arrayOfHashtags = hashtags.split(' ');

    const unique = {};
    let int = 0;

    for (let i = 0; i < arrayOfHashtags.length; i++) {
      if (arrayOfHashtags[i] === '') {
        hashtagElement.setCustomValidity('Нельзя больше одного пробела между хэштегами');
      } else {
        validateHashtag(arrayOfHashtags[i]);
        int++;
        if (unique[arrayOfHashtags[i].toLowerCase()] !== 1) {
          unique[arrayOfHashtags[i].toLowerCase()] = 1;
        }
        else {
          hashtagElement.setCustomValidity('#ХэшТег и #хэштег считаются одним и тем же тегом, теги не должны повторяться.');
        }
      }
    }
    if (int > MAX_HASHTAG_NUMBERS) {
      hashtagElement.setCustomValidity(`Хэш-тегов не должно быть больше, чем  ${MAX_HASHTAG_NUMBERS}`);
    }
  }
}

function cleanUploadFile() {
  uploadFile.value = '';
}
