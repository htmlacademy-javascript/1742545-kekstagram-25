import { validateHashtags } from './validate.js';

const MAX_VALUE_EFFECT = 100;
const MIN_SIZE_IMG = 25;
const MAX_SIZE_IMG = 100;
const SIZE_STEP_DEFAULT = 25;

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const hashtagElement = document.querySelector('.text__hashtags');
const formUploadElement = document.querySelector('#upload-select-image');
const comment = document.querySelector('.text__description');

const form = document.querySelector('.img-upload__form');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const effectInputs = document.querySelectorAll('input[name="effect"]');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const sliderBlockNone = document.querySelector('.img-upload__effect-level');
const ulEffects = document.querySelector('.effects__list');

const settingsFilters = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  }
};

function changeScaleImg (operation) {
  const numberValue = parseInt(scaleValue.value, 10);
  if (numberValue > MIN_SIZE_IMG && operation === 'reduce') {
    scaleValue.value = `${numberValue - SIZE_STEP_DEFAULT}%`;

    imgPreview.style = `transform: scale(${(numberValue - SIZE_STEP_DEFAULT) / 100})`;
  } else if (numberValue < MAX_SIZE_IMG && operation === 'increase') {
    scaleValue.value = `${numberValue + SIZE_STEP_DEFAULT}%`;

    imgPreview.style = `transform: scale(${(numberValue + SIZE_STEP_DEFAULT) / 100})`;
  }
}

scaleSmaller.addEventListener('click', () => {
  changeScaleImg('reduce');
});
scaleBigger.addEventListener('click', () => {
  changeScaleImg('increase');
});

effectInputs.forEach((effectInput) => {
  effectInput.addEventListener('change', (evt) => {
    imgPreview.classList.remove(...imgPreview.classList);
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);
  });
});

valueElement.value = MAX_VALUE_EFFECT;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to(value) {
      return (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

let filterName = 'effects__preview--none';

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  if (filterName === 'effects__preview--chrome') {
    imgPreview.style.filter = `grayscale(${valueElement.value})`;
  } else if (filterName === 'effects__preview--sepia') {
    imgPreview.style.filter = `sepia(${valueElement.value})`;
  } else if (filterName === 'effects__preview--marvin') {
    imgPreview.style.filter = `invert(${valueElement.value}%)`;
  } else if (filterName === 'effects__preview--phobos') {
    imgPreview.style.filter = `blur(${valueElement.value}px)`;
  } else if (filterName === 'effects__preview--heat') {
    imgPreview.style.filter = `brightness(${valueElement.value})`;
  }
});

sliderBlockNone.style.display = 'none';

ulEffects.addEventListener('change', (evt) => {
  filterName = `effects__preview--${evt.target.value}`;
  imgPreview.className = filterName;

  sliderBlockNone.style.display = 'block';
  sliderElement.removeAttribute('disabled');

  if (filterName === 'effects__preview--none') {
    sliderBlockNone.style.display = 'none';
    imgPreview.style.filter = 'none';
  } else {
    sliderElement.noUiSlider.updateOptions(settingsFilters[evt.target.value]);
  }
});

function openModalForm(evt) {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgPreview.src = window.URL.createObjectURL(evt.currentTarget.files[0]);
  uploadCancel.addEventListener('click', onModalClose);
  document.addEventListener('keyup', onEscapeClick);
}

uploadFile.addEventListener('change', openModalForm);
formUploadElement.addEventListener('input', onUploadForm);

function onModalClose() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keyup', onEscapeClick);
  uploadCancel.removeEventListener('click', onModalClose);
  cleanUploadForm();
}

function onEscapeClick(evt) {
  if (evt.key === 'Escape' && isFocused(comment) && isFocused(hashtagElement)) {
    evt.preventDefault();
    onModalClose();
  }
}

function onUploadForm() {
  validateHashtags(hashtagElement);
}

function isFocused(element) {
  return element !== document.activeElement;
}

function cleanUploadForm() {
  uploadFile.value = '';
  hashtagElement.value = '';
  comment.value = '';
  imgPreview.style = '';
  imgPreview.style.filter = 'none';
  sliderBlockNone.style.display = 'none';
  form.reset();
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  console.log(formData);
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  );
})
