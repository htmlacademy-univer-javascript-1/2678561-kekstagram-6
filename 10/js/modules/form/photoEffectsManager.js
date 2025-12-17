import { EFFECTS } from '../data/constants.js';

let slider = null;
let currentEffect = 'none';

function createSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview) {
  if (slider) {
    slider.destroy();
  }

  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    imagePreview.style.filter = '';
    effectLevelValue.value = '';
    return;
  }

  effectLevel.classList.remove('hidden');

  slider = noUiSlider.create(effectLevelSlider, {
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
    effectLevelValue.value = value;
    applyEffect(value, imagePreview);
  });

  effectLevelValue.value = effect.max;
  applyEffect(effect.max, imagePreview);
}

function applyEffect(value, imagePreview) {
  const effect = EFFECTS[currentEffect];
  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    return;
  }

  imagePreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
}

function onEffectChange(evt, effectLevelSlider, effectLevel, effectLevelValue, imagePreview) {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    createSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview);
  }
}

function resetEffects(uploadForm, effectLevelSlider, effectLevel, effectLevelValue, imagePreview) {
  currentEffect = 'none';
  const noneEffect = uploadForm.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }
  createSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview);
}

function getCurrentEffect() {
  return currentEffect;
}

function setCurrentEffect(effect) {
  currentEffect = effect;
}

export {
  createSlider,
  applyEffect,
  onEffectChange,
  resetEffects,
  getCurrentEffect,
  setCurrentEffect
};
