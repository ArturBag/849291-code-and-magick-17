'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var BAR_MY_COLOR = 'rgba(255, 0, 0, 1)';
var TEXT_GAP_UP = 70;
var TEXT_GAP_BOTTOM = 100;
var BAR_START_POINT = 80;
var TEXT_COLOR = 'black';
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono 16px';
  ctx.baseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = Math.round(getMaxElement(times));


  for (var i = 0; i < names.length; i++) {
    var currentHeight = BAR_HEIGHT * times[i] / maxTime;
    var verticalMargin = BAR_HEIGHT - currentHeight;
    var randomColor = Math.floor(Math.random() * (255 - 0) + 0);
    ctx.fillStyle = 'rgb(0, 0,' + randomColor + ')\'';
    if (names[i] === 'Вы') {
      ctx.fillStyle = BAR_MY_COLOR;
    }
    ctx.fillRect(CLOUD_X + BAR_MARGIN + BAR_MARGIN * i + BAR_WIDTH * i, CLOUD_Y + BAR_START_POINT + verticalMargin, BAR_WIDTH, currentHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_MARGIN + BAR_MARGIN * i + BAR_WIDTH * i, CLOUD_Y + TEXT_GAP_UP + verticalMargin);
    ctx.fillText(names[i], CLOUD_X + BAR_MARGIN + BAR_MARGIN * i + BAR_WIDTH * i, CLOUD_Y + BAR_HEIGHT + TEXT_GAP_BOTTOM);
  }
};
