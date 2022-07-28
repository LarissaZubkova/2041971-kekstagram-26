import {isEscapeKey} from './util.js';

let photos = [];

const setPhotoDataForPopup = (photoData) => {
  photos = photoData;
};

const initiatePopup = () => {
  const COMMENTS_COUNT = 5;

  const bigPicture = document.querySelector('.big-picture');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  const pictureContainer = document.querySelector('.pictures');
  const socialComments = bigPicture.querySelector('.social__comments');
  const commentItem = bigPicture.querySelector('.social__comment');

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onBigPictureCancelClick();
    }
  };

  const showComments = (comment) => {
    const commentFragment = document.createDocumentFragment();
    const commentsCurrentCount = socialCommentCount.querySelector('.comments__current-count');

    comment.forEach(({avatar, name, message}) => {
      const commentElement = commentItem.cloneNode(true);
      const commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentFragment.append(commentElement);
    });
    socialComments.append(commentFragment);
    commentsCurrentCount.textContent = socialComments.children.length;
  };

  let onCommentsLoaderClick = null;

  const showCommentsCopy = (comments) => {
    const copyComments = comments.slice();

    onCommentsLoaderClick = () => {
      if (copyComments.length <= COMMENTS_COUNT) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener ('click', onCommentsLoaderClick);
      }
      showComments(copyComments.splice(0, COMMENTS_COUNT));
    };

    if (copyComments.length <= COMMENTS_COUNT) {
      commentsLoader.classList.add('hidden');
      showComments(copyComments);
    } else {
      commentsLoader.classList.remove('hidden');
      socialCommentCount.classList.remove('hidden');
      showComments(copyComments.splice(0, COMMENTS_COUNT));

      commentsLoader.addEventListener ('click', onCommentsLoaderClick);
    }
  };

  const rendersBigPicture = ({url, likes, comments, description}) => {
    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;
  };

  const onPictureContainerClick = (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const data = photos.find((photo) => +photo.id === +picture.dataset.id);
      rendersBigPicture(data);
      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onPopupEscKeydown);
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);

      socialComments.innerHTML = '';
      showCommentsCopy (data.comments);
    }
  };

  pictureContainer.addEventListener('click', onPictureContainerClick);

  function onBigPictureCancelClick () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }
};

export {initiatePopup, setPhotoDataForPopup};
