import { EFFECTS } from '../data/constants.js';

let slider = null;
let currentEffect = 'none';
let currentElements = null;

function initEffects(effectLevelSlider, effectLevel, effectLevelValue, imagePreview) {
  currentElements = {
    effectLevelSlider,
    effectLevel,
    effectLevelValue,
    imagePreview
  };
}

function createSlider() {
  if (!currentElements) {
    return;
  }

  if (slider) {
    slider.destroy();
  }

  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    currentElements.effectLevel.classList.add('hidden');
    currentElements.imagePreview.style.filter = '';
    currentElements.effectLevelValue.value = '';
    return;
  }

  currentElements.effectLevel.classList.remove('hidden');

  slider = noUiSlider.create(currentElements.effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
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

  slider.on('update', () => {
    const value = slider.get();
    currentElements.effectLevelValue.value = value;
    applyEffect(value);
  });

  currentElements.effectLevelValue.value = effect.max;
  applyEffect(effect.max);
}

function applyEffect(value) {
  if (!currentElements) {
    return;
  }

  const effect = EFFECTS[currentEffect];
  if (currentEffect === 'none') {
    currentElements.imagePreview.style.filter = '';
    return;
  }

  currentElements.imagePreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
}

function onEffectChange(evt) {
  if (evt.target.name === 'effect' && evt.target.checked) {
    currentEffect = evt.target.value;
    createSlider();
  }
}

function resetEffects(uploadForm) {
  currentEffect = 'none';
  const noneEffect = uploadForm.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }
  if (currentElements) {
    createSlider();
  }
}

function destroyEffects() {
  if (slider) {
    slider.destroy();
    slider = null;
  }
  currentElements = null;
  currentEffect = 'none';
}

export {
  initEffects,
  createSlider,
  applyEffect,
  onEffectChange,
  resetEffects,
  destroyEffects
};
