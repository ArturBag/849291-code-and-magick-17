'use strict';
(function () {
  var setupWindow = document.querySelector('.setup');
  var dialogElem = setupWindow.querySelector('.upload');
  var userNameInput = setupWindow.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var KeyCode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  window.dialog = {
    moveElement: function (elemPress, elemMove) {
      elemPress.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var dragged = false;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          dragged = true;

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          elemMove.style.top = (elemMove.offsetTop - shift.y) + 'px';
          elemMove.style.left = (elemMove.offsetLeft - shift.x) + 'px';

        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          if (dragged) {
            var onClickPreventDefault = function (evtClick) {
              evtClick.preventDefault();
              elemPress.removeEventListener('click', onClickPreventDefault);
            };
            elemPress.addEventListener('click', onClickPreventDefault);
          }
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

      });
    },

    getRandomNumber: function (param) {
      return Math.round(Math.random() * param);
    },
    onPopupEscPress: function (evt, buttonCode, popupInput) {
      if (evt.buttonCode === buttonCode.ESC_KEYCODE) {
        if (popupInput.classList.contains('infocus')) {
          evt.preventDefault();
        } else {
          window.dialog.closePopup(setupWindow, 'hidden', '80px', '50%');
        }
      }
    },
    openPopup: function (popup, popupClass) {
      popup.classList.remove(popupClass);
      document.addEventListener('keydown', window.dialog.onPopupEscPress(KeyCode, userNameInput));
    },
    closePopup: function (popup, popupClass, styleTop, styleLeft) {
      popup.classList.add(popupClass);
      document.removeEventListener('keydown', window.dialog.onPopupEscPress(KeyCode, userNameInput));
      popup.style.top = styleTop;
      popup.style.left = styleLeft;
    }
  };

  window.dialog.moveElement(dialogElem, setupWindow);

  userNameInput.addEventListener('focus', function () {
    userNameInput.classList.add('infocus');
  });

  userNameInput.addEventListener('blur', function () {
    userNameInput.classList.remove('infocus');
  });

  setupOpen.addEventListener('click', function () {
    window.dialog.openPopup(setupWindow, 'hidden');
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER_KEYCODE) {
      window.dialog.openPopup(setupWindow, 'hidden');
    }
  });

  setupClose.addEventListener('click', function () {
    window.dialog.closePopup(setupWindow, 'hidden', '80px', '50%');
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER_KEYCODE) {
      window.dialog.closePopup(setupWindow, 'hidden', '80px', '50%');
    }
  });
})();
