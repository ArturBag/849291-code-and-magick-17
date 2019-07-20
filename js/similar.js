'use strict';
(function () {

  var wizardsData = [];
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var coatColor = '';
  var eyesColor = '';
  var inputCoatColor = document.querySelector('input[name=coat-color]');
  // var inputEyesColor = document.querySelector('input[name=eyes-color]');

  // var getRandomElement = function (array) {
  //   var randomElementIndex = Math.floor(Math.random() * array.length);
  //   return array[randomElementIndex];
  // };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    // console.log(wizard.colorCoat, coatColor, rank);
    //console.log(wizard.colorEyes, eyesColor);

    return rank;
  };

  // var namesComparator = function (left, right) {
  //   if (left > right) {
  //     return 1;
  //   } else if (left < right) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // }

  var updateWizards = function () {
    window.setupModule.renderWizard(wizardsData.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizardsData.indexOf(left) - wizardsData.indexOf(right);
      }
      console.log(rankDiff)
      return rankDiff;
    }));
  }

  wizardCoatElement.addEventListener('click', function (evt) {

    window.setupModule.changeWizardColor(wizardCoatElement, wizardsData[window.setupModule.getRandomNumber(wizardsData.length - 1)].colorCoat, inputCoatColor);
    // coatColor = evt.currentTarget.style.fill; // getRandomElement(wizardsData).colorCoat;
    // console.log("coatColor", event.currentTarget.style.fill)
    // window.setupModule.changeWizardColor(wizardCoatElement, coatColor, inputCoatColor);
    coatColor = wizardsData[window.setupModule.getRandomNumber(wizardsData.length - 1)].colorCoat;
    console.log(coatColor)

    updateWizards();
  });


  wizardEyesElement.addEventListener('click', function (evt) {
    //window.changeWizardColor(wizardCoat, wizardData[getRandomNumber(wizardData.length - 1)].colorCoat, inputCoatColor);
    eyesColor = evt.currentTarget.style.fill;
    // window.setupModule.changeWizardColor(eyesColor)
    updateWizards();
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
