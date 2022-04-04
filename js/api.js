function getPhotoContent(url) {
  return fetch(url);
}

function sendData(data, onSuccess, onFail) {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(response.json());
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}


export { getPhotoContent, sendData };
