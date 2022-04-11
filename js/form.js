import { validateHashtags } from './validate.js';
import { sendData } from './api.js';
import { showUploadSection } from './upload-alert.js';
import { settingsFilters } from './filters-config.js';
import { isFocused } from './util.js';

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
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const effectInputs = form.querySelectorAll('input[name="effect"]');
const sliderElement = form.querySelector('.effect-level__slider');
const valueElement = form.querySelector('.effect-level__value');
const sliderBlockNone = form.querySelector('.img-upload__effect-level');
const ulEffects = form.querySelector('.effects__list');
let filterName = 'effects__preview--none';

const uploadSubmit = document.querySelector('.img-upload__submit');
const uploadSuccessTemplate = document.querySelector('#success').content;
const uploadSuccessElement = uploadSuccessTemplate.querySelector('section');
const uploadSuccessButton = uploadSuccessElement.querySelector('.success__button');
const uploadErrorTemplate = document.querySelector('#error').content;
const uploadErrorElement = uploadErrorTemplate.querySelector('section');
const uploadErrorButton = uploadErrorElement.querySelector('.error__button');

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

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

  switch (filterName) {
    case 'effects__preview--chrome':
      imgPreview.style.filter = `grayscale(${valueElement.value})`;
      break;
    case 'effects__preview--sepia':
      imgPreview.style.filter = `sepia(${valueElement.value})`;
      break;
    case 'effects__preview--marvin':
      imgPreview.style.filter = `invert(${valueElement.value}%)`;
      break;
    case 'effects__preview--phobos':
      imgPreview.style.filter = `blur(${valueElement.value}px)`;
      break;
    case 'effects__preview--heat':
      imgPreview.style.filter = `brightness(${valueElement.value})`;
      break;
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
  form.addEventListener('submit', handleSubmit);
}

uploadFile.addEventListener('change', openModalForm);
formUploadElement.addEventListener('input', onUploadForm);

function onModalClose() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keyup', onEscapeClick);
  uploadCancel.removeEventListener('click', onModalClose);
  cleanUploadForm();
  form.removeEventListener('submit', handleSubmit);
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

function cleanUploadForm() {
  uploadFile.value = '';
  hashtagElement.value = '';
  comment.value = '';
  imgPreview.style = '';
  imgPreview.style.filter = 'none';
  sliderBlockNone.style.display = 'none';
  form.reset();
}

function setSubmitButtonState(isBlocked) {
  uploadSubmit.disabled = isBlocked;
  uploadSubmit.textContent = isBlocked ? 'Публикую...' : 'Опубликовать';
}

function handleSubmit(evt) {
  evt.preventDefault();
  setSubmitButtonState(true);
  const formData = new FormData(form);

  sendData(
    formData,
    () => {
      onModalClose();
      setSubmitButtonState(false);
      showUploadSection(uploadSuccessElement, uploadSuccessButton, '.success');
    },
    () => {
      onModalClose();
      setSubmitButtonState(false);
      showUploadSection(uploadErrorElement, uploadErrorButton, '.error');
    }
  );
}
