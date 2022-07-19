import { showAlert } from './util.js';
import { sendData } from './api.js';

const MAX_COUNT_HASHTEGS = 5;
const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');

const pristine = new window.Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHeshtags = (value) => {
  const hashtegsElements = getArrayHashtags(value);
  const regex = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| hashtegsElements.every((hashteg)=>regex.test(hashteg));
};

const validateCountHashtags = (value) =>{
  const hashtegsElements = getArrayHashtags(value);
  return hashtegsElements.length <= MAX_COUNT_HASHTEGS;
};

pristine.addValidator(textHashtags, validateHeshtags, 'Неверный формат хэш-тега');
pristine.addValidator(textHashtags, validateCountHashtags, `Максимум ${MAX_COUNT_HASHTEGS} хэш-тегов`);

const validateForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()){
      form.submit();
    }
  });
};


const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
        new FormData(evt.target),
      );
    }
  });
};

export {validateForm, setUserFormSubmit};
