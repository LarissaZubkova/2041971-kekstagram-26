const imgPreview = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

effectSlider.classList.add('hidden');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const getFilterValue = (sliderName, unit) => {
  if (sliderName === 'none') {
    imgPreview.style.filter = 'none';
    return;
  }

  effectSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectSlider.noUiSlider.get();
    imgPreview.style.filter = `${sliderName}(${effectLevelValue.value}${unit})`;
  });
};

const resetFilters = () => {
  effectSlider.classList.add('hidden');
  getFilterValue ('none');
};

const initiateSlider = () => {
  const onEffectsListClick = (evt) => {
    const effect = evt.target.closest('.effects__radio');
    effectSlider.classList.remove('hidden');
    effectSlider.noUiSlider.off();

    if (effect) {
      imgPreview.removeAttribute('class');
      imgPreview.classList.add(`effects__preview--${effect.value}`);
      switch (effect.value) {

        case 'chrome':
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          getFilterValue ('grayscale', '');
          break;

        case 'sepia':
          imgPreview.style = '';
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          getFilterValue ('sepia', '');
          break;

        case 'phobos':
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          getFilterValue ('blur', 'px');
          break;

        case 'heat':
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          getFilterValue ('brightness', '');
          break;

        case 'marvin':
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          getFilterValue ('invert', '%');
          break;

        default:
          resetFilters();
      }
    }
  };

  effectsList.addEventListener('click', onEffectsListClick);
};

export {initiateSlider, resetFilters};
