'use strict';
(function () {

  var WIZARD_SUM = 4;
  window.setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.querySelector('.setup-close');
  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = form.querySelector('.setup-user-name');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireBall = document.querySelector('.setup-fireball-wrap');
  var inputCoatColor = document.querySelector('input[name=coat-color]');
  var inputEyesColor = document.querySelector('input[name=eyes-color]');
  var inputFireballColor = document.querySelector('input[name=fireball-color]');
  var KeyCode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };
  var wizardShow = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  wizardShow.classList.remove('hidden');
  var getRandomNumber = function (param) {
    return Math.round(Math.random() * param);
  };

  var renderWizard = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_SUM; i++) {
      var randomCoatColor = wizards[getRandomNumber(wizards.length - 1)].colorCoat;
      var randomName = wizards[getRandomNumber(wizards.length - 1)].name;
      var randomEyesColor = wizards[getRandomNumber(wizards.length - 1)].colorEyes;

      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = randomName;
      wizardElement.querySelector('.wizard-coat').style.fill = randomCoatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = randomEyesColor;
      fragment.appendChild(wizardElement);
    }
    similarListElement.appendChild(fragment);

  };

  var changeWizardColor = function (wizardObject, colorData, valueOfInput) {
    wizardObject.style.fill = colorData;
    valueOfInput.value = colorData;
  };

  var wizardSetup = function (wizardData) {
    wizardCoat.addEventListener('click', function () {
      changeWizardColor(wizardCoat, wizardData[getRandomNumber(wizardData.length - 1)].colorCoat, inputCoatColor);
    });

    wizardEyes.addEventListener('click', function () {
      changeWizardColor(wizardEyes, wizardData[getRandomNumber(wizardData.length - 1)].colorEyes, inputEyesColor);
    });

    fireBall.addEventListener('click', function () {
      var fireballColor = wizardData[getRandomNumber(wizardData.length - 1)].colorFireball;
      fireBall.style.background = fireballColor;
      inputFireballColor.value = fireballColor;
    });

  };

  var onSuccess = function (wizards) {
    renderWizard(wizards);
    wizardSetup(wizards);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC_KEYCODE) {
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
    window.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.setup.style.top = '80px';
    window.setup.style.left = '50%';
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER_KEYCODE) {
      closePopup();
    }
  });


  window.backend.load(onSuccess, onError);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(onSuccess, onError, new FormData(form));
  });

})();
