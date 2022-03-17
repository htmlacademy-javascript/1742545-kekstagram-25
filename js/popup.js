const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const fragment = document.createDocumentFragment();

export function showBigPicture(photo) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');

  socialComments.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    const commentImg = document.createElement('img');
    commentItem.appendChild(commentImg);
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
    commentImg.width = 35;
    commentImg.height = 35;
    const commentText = document.createElement('p');
    commentItem.appendChild(commentText);
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    fragment.appendChild(commentItem);
  });

  socialComments.appendChild(fragment);

  function onModalClose() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keyup', (evt) => {
      onEscapeClick(evt);
    });
    bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onModalClose);
  }

  function onEscapeClick(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onModalClose();
    }
  }

  document.addEventListener('keyup', (evt) => {
    onEscapeClick(evt);
  });

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onModalClose);
}
