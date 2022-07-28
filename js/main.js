import {getData} from './api.js';
import {generateThumbnails} from './thumbnails.js';
import {initiatePopup, setPhotoDataForPopup} from './popup.js';
import {changeScale} from './scale.js';
import {initiateSlider} from './effects.js';
import {setUserFormSubmit} from './validation.js';
import {onCancelButtonClick} from './img-form.js';
import {setFilterClick} from './set-filters.js';
import {uploadFile} from './upload-file.js';

changeScale();
initiateSlider();
uploadFile();

getData((photos) => {
  generateThumbnails(photos);
  setPhotoDataForPopup(photos);
  initiatePopup();
  setFilterClick(photos);
});

setUserFormSubmit(onCancelButtonClick);
