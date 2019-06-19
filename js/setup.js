'use strict';

var WIZARD_SUM = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireBall = document.querySelector('.setup-fireball-wrap');
var WizardsData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};
var wizardShow = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
wizardShow.classList.remove('hidden');
var getRandomNumber = function (param) {
  return Math.round(Math.random() * param);
};

var renderWizardData = function () {
  var wizardsArray = [];
  for (var i = 0; i < WIZARD_SUM; i++) {
    wizardsArray.push({
      name: WizardsData.NAMES[getRandomNumber(WizardsData.NAMES.length - 1)],
      lastName: WizardsData.LAST_NAMES[getRandomNumber(WizardsData.LAST_NAMES.length - 1)],
      coatColor: WizardsData.COAT_COLOR[getRandomNumber(WizardsData.COAT_COLOR.length - 1)],
      eyesColor: WizardsData.EYES_COLOR[getRandomNumber(WizardsData.EYES_COLOR.length - 1)]
    });
  }
  return wizardsArray;
};


var renderWizard = function () {
  var fragment = document.createDocumentFragment();
  var wizardsInfo = renderWizardData();
  for (var i = 0; i < wizardsInfo.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardsInfo[i].name + ' ' + wizardsInfo[i].lastName;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardsInfo[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardsInfo[i].eyesColor;
    fragment.appendChild(wizardElement);

  }
  similarListElement.appendChild(fragment);

};

renderWizard();


//  Задание 4.  Учебный проект: одеть Надежду


// Валидация ввода имени персонажа

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (userNameInput.classList.contains('infocus')) {
      evt.preventDefault();
    } else {
      closePopup();
    }
  }
};

userNameInput.addEventListener('focus', function () {
  userNameInput.classList.add('infocus');
});

userNameInput.addEventListener('blur', function () {
  userNameInput.classList.remove('infocus');
});


var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


var changeWizardColor = function (wizardObject, colorData) {
  wizardObject.style.fill = colorData;
};

wizardCoat.addEventListener('click', function () {
  changeWizardColor(wizardCoat, WizardsData.COAT_COLOR[getRandomNumber(WizardsData.COAT_COLOR.length - 1)]);
});


wizardEyes.addEventListener('click', function () {
  changeWizardColor(wizardEyes, WizardsData.EYES_COLOR[getRandomNumber(WizardsData.EYES_COLOR.length - 1)]);
});

fireBall.addEventListener('click', function () {
  fireBall.style.background = WizardsData.FIREBALL_COLOR[getRandomNumber(WizardsData.FIREBALL_COLOR.length - 1)];
});

