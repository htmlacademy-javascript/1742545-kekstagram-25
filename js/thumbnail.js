import { showBigPicture } from './popup.js';
import { showAlert } from './util.js';
import { getRandomNumber } from './util.js';
import { debounce } from './util.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplateElement = pictureTemplate.querySelector('a');
const fragment = document.createDocumentFragment();
const picturesWrapper = document.querySelector('.pictures');

const imgFilters = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
let uploadedPhotos;

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photoContent) => {
      uploadedPhotos = photoContent;
      buildPhotoContent(photoContent);
      imgFilters.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные!');
    });
});

function buildPhotoContent(photoContent) {
  photoContent.forEach((photo) => {
    const templateClone = pictureTemplateElement.cloneNode(true);
    templateClone.querySelector('.picture__img').src = photo.url;
    templateClone.querySelector('.picture__likes').textContent = photo.likes;
    templateClone.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(templateClone);
    templateClone.addEventListener('click', () => showBigPicture(photo));
  });

  picturesWrapper.appendChild(fragment);
}

function removePhotoContent() {
  const pictures = picturesWrapper.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
}

function handleFilterChange(filterName) {
  removePhotoContent();

  if(filterName === 'filterDefaultButton') {

    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');

    buildPhotoContent(uploadedPhotos);
  } else if (filterName === 'filterRandomButton') {

    filterRandomButton.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');

    const randomPhotos = [];
    const usedIndexes = [];

    while(randomPhotos.length < 10) {
      const index = getRandomNumber(0, 9);
      if(!usedIndexes.includes(index)) {
        usedIndexes.push(index);
        randomPhotos.push(uploadedPhotos[index]);
      }
    }

    buildPhotoContent(randomPhotos);
  } else if (filterName === 'filterDiscussedButton') {

    filterDiscussedButton.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');

    const sortedPhotos = [...uploadedPhotos].sort((a, b) => b.comments.length - a.comments.length);

    buildPhotoContent(sortedPhotos);
  }
}

filterDefaultButton.addEventListener('click', debounce(() => {
  handleFilterChange('filterDefaultButton');
}, 500));

filterRandomButton.addEventListener('click', debounce(() => {
  handleFilterChange('filterRandomButton');
}, 500));

filterDiscussedButton.addEventListener('click', debounce(() => {
  handleFilterChange('filterDiscussedButton');
}, 500));
