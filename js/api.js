import {showAlert} from './util.js';

const DATA_GET = 'https://26.javascript.pages.academy/kekstagram/data';
const DATA_SEND = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(DATA_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось загрузить фото. Попробуйте ещё раз');
      }
    })
    .then((photos) => onSuccess(photos))
    .catch(() => {
      showAlert('Не удалось загрузить фото. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    DATA_SEND,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
