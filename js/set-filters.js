import {getRandomeInInclusie, debounce} from './util.js';
import {generateThumbnails} from './thumbnails.js';
import {setPhotoDataForPopup} from './popup.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTO_MAX_COUNT = 10;

const removePhoto = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const comparePhotoByComments = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;
const getDiscussedPhotos = (photos) => photos.slice().sort(comparePhotoByComments);

const shufflePhoto = (photos) => {
  const photosCopy = photos.slice();
  const newPhotosCopy = [];
  while (newPhotosCopy.length <= RANDOM_PHOTO_MAX_COUNT) {
    const newPhotos = photosCopy.splice(getRandomeInInclusie(0, photosCopy.length-1), 1);
    newPhotosCopy.push(newPhotos[0]);
  }
  return newPhotosCopy;
};

const getRandomPhotos = (photos) => shufflePhoto(photos).slice(0,10);

const setFilterClick = (photos) => {
  const imgFilters = document.querySelector('.img-filters');
  const defaultButton = imgFilters.querySelector('#filter-default');
  const randomButton = imgFilters.querySelector('#filter-random');
  const discussedButton = imgFilters.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', debounce((evt) => onImgFiltersClick(evt), RERENDER_DELAY));

  function onImgFiltersClick (evt) {
    const filter = evt.target.closest('.img-filters__button');
    let photoData;
    if (filter) {
      switch (filter.id) {

        case 'filter-random':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.add('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          photoData = getRandomPhotos(photos);
          generateThumbnails(photoData);
          setPhotoDataForPopup(photoData);
          break;

        case 'filter-discussed':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.add('img-filters__button--active');
          removePhoto();
          generateThumbnails(getDiscussedPhotos(photos));
          setPhotoDataForPopup(getDiscussedPhotos(photos));
          break;

        case 'filter-default':
        default:
          defaultButton.classList.add('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(photos);
          setPhotoDataForPopup(photos);
      }
    }}
};

export {setFilterClick};
