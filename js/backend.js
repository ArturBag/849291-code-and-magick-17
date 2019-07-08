'use strict';
(function () {

  var URL = 'https://js.dump.academy/code-and-magick/data';


  var ajaxSendData = function (onLoad, onError, methodType, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open(methodType, URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    ajaxSendData(onLoad, onError, 'GET', null);

  };

  var save = function (onLoad, onError, data) {
    ajaxSendData(onLoad, onError, 'POST', data);
    window.setup.classList.add('hidden');

  };

  window.backend = {
    ajaxSendData: ajaxSendData,
    load: load,
    save: save
  };

})();
