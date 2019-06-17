'use strict';

var WIZARD_SUM = 4;
var userDialog = document.querySelector('.setup');
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
