function getData(onSuccess, onFail) {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((content) => {
      onSuccess(content);
    })
    .catch(() => {
      onFail();
    });
}

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

export { getData, sendData };
