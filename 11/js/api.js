function sendData(data, onSuccess, onFail) {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => (response.ok) ? onSuccess() : onFail())
    .catch(() => {
      onFail();
    });
}

export { sendData };
