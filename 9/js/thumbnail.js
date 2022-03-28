import { photoContent } from './data.js';
import { showBigPicture } from './popup.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplateElement = pictureTemplate.querySelector('a');
const fragment = document.createDocumentFragment();
const picturesWrapper = document.querySelector('.pictures');

photoContent.forEach((photo) => {
  const templateClone = pictureTemplateElement.cloneNode(true);
  templateClone.querySelector('.picture__img').src = photo.url;
  templateClone.querySelector('.picture__likes').textContent = photo.likes;
  templateClone.querySelector('.picture__comments').textContent = photo.comments.length;
  fragment.appendChild(templateClone);
  templateClone.addEventListener('click', () => showBigPicture(photo));
});

picturesWrapper.appendChild(fragment);
