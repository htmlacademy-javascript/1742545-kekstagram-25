import { photoContent } from "./data.js";

const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplateElement = pictureTemplate.querySelector('a');
const fragment = document.createDocumentFragment();
const picturesWrapper = document.querySelector('.pictures');

photoContent.forEach(({url, likes, comments}) => {
  const templateClone = pictureTemplateElement.cloneNode(true);
  templateClone.querySelector('.picture__img').src = url;
  templateClone.querySelector('.picture__likes').textContent = likes;
  templateClone.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(templateClone);
});

picturesWrapper.appendChild(fragment);

