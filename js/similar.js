'use strict';
(function () {

  var wizardsData = [];
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var coatColor = '';
  var eyesColor = '';
  var inputCoatColor = document.querySelector('input[name=coat-color]');

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    window.setupModule.renderWizard(wizardsData.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizardsData.indexOf(left) - wizardsData.indexOf(right);
      }
      return rankDiff;
    }));
  };

  wizardCoatElement.addEventListener('click', function () {
    coatColor = wizardsData[window.setupModule.getRandomNumber(wizardsData.length - 1)].colorCoat;
    window.setupModule.changeWizardColor(wizardCoatElement, coatColor, inputCoatColor);
    window.debounce(updateWizards);
  });


  wizardEyesElement.addEventListener('click', function () {
    eyesColor = wizardsData[window.setupModule.getRandomNumber(wizardsData.length - 1)].colorEyes;
    window.setupModule.changeWizardColor(wizardEyesElement, eyesColor, inputCoatColor);
    window.debounce(updateWizards);
  });


  var onSuccess = function (wizards) {
    wizardsData = wizards;
    updateWizards();
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

  window.backend.load(onSuccess, onError);

})();
