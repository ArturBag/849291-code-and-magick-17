'use strict';

var WIZARD_SUM = 4;
var userDialog = document.querySelector('.setup');
var wizardsArray = [];
var fragment = document.createDocumentFragment();
var WizardsData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
};
var wizardShow = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
userDialog.classList.remove('hidden');
wizardShow.classList.remove('hidden');
var getRandomNumber = function (param) {
  return Math.round(Math.random() * param);
};

var renderWizard = function (wizardInfo, newWizard) {

  for (var i = 0; i < WIZARD_SUM; i++) {
    newWizard.push({
      name: wizardInfo.NAMES[getRandomNumber(wizardInfo.NAMES.length - 1)],
      lastName: wizardInfo.LAST_NAMES[getRandomNumber(wizardInfo.LAST_NAMES.length - 1)],
      coatColor: wizardInfo.COAT_COLOR[getRandomNumber(wizardInfo.COAT_COLOR.length - 1)],
      eyesColor: wizardInfo.EYES_COLOR[getRandomNumber(wizardInfo.EYES_COLOR.length - 1)]
    });

    var showWizard = function (wizardsElem) {

      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizardsElem[i].name + ' ' + wizardsElem[i].lastName;
      wizardElement.querySelector('.wizard-coat').style.fill = wizardsElem[i].coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizardsElem[i].eyesColor;
      fragment.appendChild(wizardElement);
      similarListElement.appendChild(fragment);

    };
    showWizard(wizardsArray);
  }
};

renderWizard(WizardsData, wizardsArray);
