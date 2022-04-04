// import { photoContent } from './data.js';
import { showBigPicture } from './popup.js';
import { getPhotoContent } from './api.js';
import { showAlert } from './util.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplateElement = pictureTemplate.querySelector('a');
const fragment = document.createDocumentFragment();
const picturesWrapper = document.querySelector('.pictures');

document.addEventListener('DOMContentLoaded', () => {
  getPhotoContent('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photoContent) => {
      photoContent.forEach((photo) => {
        const templateClone = pictureTemplateElement.cloneNode(true);
        templateClone.querySelector('.picture__img').src = photo.url;
        templateClone.querySelector('.picture__likes').textContent = photo.likes;
        templateClone.querySelector('.picture__comments').textContent = photo.comments.length;
        fragment.appendChild(templateClone);
        templateClone.addEventListener('click', () => showBigPicture(photo));
      });

      picturesWrapper.appendChild(fragment);
    })
    .catch((error) => {
      showAlert('Не удалось загрузить данные!');
    });
})
