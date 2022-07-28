import {isEscapeKey} from './util.js';

const showMessageSuccess = () => {
  const messageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const body = document.querySelector('body');

  const messageElement = messageTemplate.cloneNode(true);
  body.appendChild(messageElement);

  const successButton = messageElement.querySelector('.success__button');
  const successInner = messageElement.querySelector('.success__inner');

  const onMessageEscDown = () => {
    if (isEscapeKey) {
      onSuccessButtonClick();
    }
  };

  const onDocumentClick = (evt) => {
    if (evt.target.closest('.success__inner') !== successInner) {
      onSuccessButtonClick();
    }
  };

  function onSuccessButtonClick () {
    messageElement.classList.add('hidden');
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('keydown', onMessageEscDown);
    document.removeEventListener('click', onDocumentClick);
  }

  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onMessageEscDown);
  document.addEventListener('click', onDocumentClick);
};

const showMessageError = () => {
  const imgUpload = document.querySelector('.img-upload__overlay');
  const messageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const body = document.querySelector('body');

  const messageElement = messageTemplate.cloneNode(true);
  body.appendChild(messageElement);
  imgUpload.classList.add('hidden');

  const errorButton = messageElement.querySelector('.error__button');
  const errorInner = messageElement.querySelector('.error__inner');

  const onMessageEscDown = () => {
    if (isEscapeKey) {
      onErrorButtonClick();
    }
  };

  const onDocumentClickCansel = (evt) => {
    if (evt.target.closest('.error__inner') !== errorInner) {
      onErrorButtonClick();
    }
  };

  function onErrorButtonClick () {
    messageElement.classList.add('hidden');
    imgUpload.classList.remove('hidden');
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onMessageEscDown);
    document.removeEventListener('click', onDocumentClickCansel);
  }

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onMessageEscDown);
  document.addEventListener('click', onDocumentClickCansel);
};

export {showMessageSuccess, showMessageError};


