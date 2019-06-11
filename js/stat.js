'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono 16px';
  ctx.baseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = Math.round(getMaxElement(times));


  for (var i = 0; i < names.length; i++) {
    var currentHeight = BAR_HEIGHT * times[i] / maxTime;
    var verticalMargin = BAR_HEIGHT - currentHeight;
    var CURRENT_BAR_X = CLOUD_X + BAR_MARGIN + BAR_MARGIN * i + BAR_WIDTH * i;
    var randomColor = Math.floor(Math.random() * (255 - 0) + 0);
    ctx.fillStyle = 'rgb(0, 0,' + randomColor + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = BAR_MY_COLOR;
    }
    ctx.fillRect(CURRENT_BAR_X, CLOUD_Y + BAR_START_POINT + verticalMargin, BAR_WIDTH, currentHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), CURRENT_BAR_X, CLOUD_Y + TEXT_GAP_UP + verticalMargin);
    ctx.fillText(names[i], CURRENT_BAR_X, CLOUD_Y + BAR_HEIGHT + TEXT_GAP_BOTTOM);
  }
};
