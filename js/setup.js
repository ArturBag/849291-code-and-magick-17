'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var wizardsArray = [];
var wizardsArrayLength = 4;
var wizardsData = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};
var wizardShow = document.querySelector('.setup-similar');
wizardShow.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var getRandomNumber = function (param) {
  return Math.round(Math.random() * param);
};

for (var i = 0; i < wizardsArrayLength; i++) {

  wizardsArray.push({
    name: wizardsData.names[getRandomNumber(wizardsData.names.length - 1)],
    lastName: wizardsData.lastNames[getRandomNumber(wizardsData.lastNames.length - 1)],
    coatColor: wizardsData.coatColor[getRandomNumber(wizardsData.coatColor.length - 1)],
    eyesColor: wizardsData.eyesColor[getRandomNumber(wizardsData.eyesColor.length - 1)]
  });

  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardsArray[i].name + ' ' + wizardsArray[i].lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardsArray[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardsArray[i].eyesColor;
  similarListElement.appendChild(wizardElement);
}
