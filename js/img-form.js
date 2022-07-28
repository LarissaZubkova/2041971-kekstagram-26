import {isEscapeKey} from './util.js';
import {resetFilters} from './effects.js';
import {resetScale} from './scale.js';
import {pristine} from './validation.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgFile = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const onCancelButtonClick = () => {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFileKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  imgFile.value = '';
  resetFilters();
  resetScale();
  pristine.reset();
};

function onUploadFileKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCancelButtonClick();
  }
}

const onImgFileChange = () => {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFileKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

imgFile.addEventListener('change', onImgFileChange);

const onFocusInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagsInput.addEventListener('keydown', onFocusInputEscKeydown);
commentTextarea.addEventListener('keydown', onFocusInputEscKeydown);

export {onCancelButtonClick};
