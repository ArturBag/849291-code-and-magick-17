'use strict';
(function () {

  var WIZARD_SUM = 4;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = form.querySelector('.setup-user-name');
  var fireBall = document.querySelector('.setup-fireball-wrap');
  var inputFireballColor = document.querySelector('input[name=fireball-color]');
  var wizardsList = [];
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
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_SUM; i++) {
      var randomCoatColor = wizards[i].colorCoat;
      var randomName = wizards[i].name;
      var randomEyesColor = wizards[i].colorEyes;
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

  fireBall.addEventListener('click', function () {
    var fireballColor = wizardsList[getRandomNumber(wizardsList.length - 1)].colorFireball;
    fireBall.style.background = fireballColor;
    inputFireballColor.value = fireballColor;
  });


  var onSuccess = function (wizards) {
    wizardsList = wizards;

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

  var addClassList = function (element, className) {
    element.classList.add(className);
  };

  var removeClassList = function (element, className) {
    element.classList.remove(className);
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
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style.top = '80px';
    setup.style.left = '50%';
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

  window.setupModule = {
    setup: setup,
    addClassList: addClassList,
    removeClassList: removeClassList,
    renderWizard: renderWizard,
    changeWizardColor: changeWizardColor,
    getRandomNumber: getRandomNumber
  };

  window.backend.load(onSuccess, onError);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(onSuccess, onError, new FormData(form));
  });

})();
