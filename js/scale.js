const MAX_VALUE = 100;
const imgPreview = document.querySelector('.img-upload__preview');
const scaleValue = document.querySelector('.scale__control--value');
let scaleCarrentValue = +scaleValue.value.substring(0, scaleValue.value.length-1);

const changeScale = () => {
  const MIN_VALUE = 25;
  const SCALE_STEP = 25;
  const PERCENT_COEFFICIENT = 0.01;
  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');

  const onScaleSmollerClick = () => {
    if (scaleCarrentValue > MIN_VALUE && scaleCarrentValue <= MAX_VALUE) {
      scaleCarrentValue -= SCALE_STEP;
      scaleValue.value = `${scaleCarrentValue}%`;
      imgPreview.style.transform = `scale(${+scaleCarrentValue * PERCENT_COEFFICIENT})`;
    }
  };

  const onScaleBiggerClick = () => {
    if (scaleCarrentValue < MAX_VALUE && scaleCarrentValue >= MIN_VALUE) {
      scaleCarrentValue += SCALE_STEP;
      scaleValue.value = `${scaleCarrentValue}%`;
      imgPreview.style.transform = `scale(${+scaleCarrentValue * PERCENT_COEFFICIENT})`;
    }
  };

  scaleSmaller.addEventListener('click', onScaleSmollerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
};

const resetScale = () => {
  scaleCarrentValue = MAX_VALUE;
  scaleValue.value = `${MAX_VALUE}%`;
  imgPreview.style.transform = 'none';
};

export {changeScale, resetScale};
