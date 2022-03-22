import { validateHashtags } from './validate.js';

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagElement = document.querySelector('.text__hashtags');
const formUploadElement = document.querySelector('#upload-select-image');
const comment = document.querySelector('.text__description');

function openModalForm(evt) {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__preview img').src = window.URL.createObjectURL(evt.currentTarget.files[0]);
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
  if (evt.key === 'Escape' && isNotFocused(comment) && isNotFocused(hashtagElement)) {
    evt.preventDefault();
    onModalClose();
  }
}

function onUploadForm() {
  validateHashtags(hashtagElement);
}

function isNotFocused(element) {
  return element !== document.activeElement;
}

function cleanUploadForm() {
  uploadFile.value = '';
  hashtagElement.value = '';
  comment.value = '';
}
