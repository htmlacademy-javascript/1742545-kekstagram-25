const DEFAULT_COMMENT_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.social__comments-loader');
const fragment = document.createDocumentFragment();
let currentCommentCount = DEFAULT_COMMENT_COUNT;

// function checkCommentsCount(photo, currentCommentCount) {
//   if (currentCommentCount >= photo.comments.length) {
//     currentCommentCount = photo.comments.length;
//     commentLoader.classList.add('hidden');
//   }
// }

// function onCommentLoaderClick(photo, currentCommentCount) {
//   currentCommentCount += DEFAULT_COMMENT_COUNT;
//   checkCommentsCount(photo, currentCommentCount);
//   bigPicture.querySelector('.current-count').textContent = currentCommentCount;
//   printComments(photo.comments, currentCommentCount);
// }

function checkCommentsCount(photo) {
  if (currentCommentCount >= photo.comments.length) {
    currentCommentCount = photo.comments.length;
    commentLoader.classList.add('hidden');
  }
}

function onCommentLoaderClick(photo) {
  currentCommentCount += DEFAULT_COMMENT_COUNT;
  checkCommentsCount(currentCommentCount, photo);
  bigPicture.querySelector('.current-count').textContent = currentCommentCount;
  printComments(photo.comments);
}

function onModalClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keyup', onEscapeClick);
  bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onModalClose);
  commentLoader.classList.remove('hidden');
  currentCommentCount = DEFAULT_COMMENT_COUNT;
}

function onEscapeClick(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onModalClose();
  }
}

function showBigPicture(photo) {
  checkCommentsCount(photo);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.current-count').textContent = currentCommentCount;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  printComments(photo.comments);

  // function onModalClose() {
  //   bigPicture.classList.add('hidden');
  //   document.body.classList.remove('modal-open');
  //   document.removeEventListener('keyup', onEscapeClick);
  //   bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onModalClose);
  //   commentLoader.removeEventListener('click', onCommentLoaderClick);
  //   commentLoader.classList.remove('hidden');
  // }

  // function onEscapeClick(evt) {
  //   if (evt.key === 'Escape') {
  //     evt.preventDefault();
  //     onModalClose();
  //   }
  // }

  // function onCommentLoaderClick() {
  //   currentCommentCount += DEFAULT_COMMENT_COUNT;
  //   checkCommentsCount();
  //   bigPicture.querySelector('.current-count').textContent = currentCommentCount;
  //   printComments(photo.comments, currentCommentCount);
  // }

  function onLoadCommentClick() {
    onCommentLoaderClick(photo);
  }

  commentLoader.addEventListener('click', onLoadCommentClick);

  document.addEventListener('keyup', onEscapeClick);

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onModalClose);

  // function checkCommentsCount() {
  //   if (currentCommentCount >= photo.comments.length) {
  //     currentCommentCount = photo.comments.length;
  //     commentLoader.classList.add('hidden');
  //   }
  // }
}

function printComments(comments, count) {
  socialComments.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const comment = comments[i];
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
  }

  socialComments.appendChild(fragment);
}

export { showBigPicture };
