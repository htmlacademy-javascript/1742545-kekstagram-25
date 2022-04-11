const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';

function getData(onSuccess, onFail) {
  fetch(GET_URL)
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
    POST_URL,
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
