'use strict';

// Валидация формы
(function () {

  window.form = {
    markInvalidfields: function (field) {
      field.addEventListener('blur', function () {
        var message = document.querySelector('.' + field.className + ' + .message-incorrect');

        if (!field.checkValidity()) {
          field.style.border = '2px solid rgba(255, 0, 0, 0.5)';
          if (message) {
            message.classList.remove('message-incorrect--hidden');
          }
        } else {
          field.style.border = '2px solid rgba(72, 72, 72, 0.5)';
          if (message) {
            message.classList.add('message-incorrect--hidden');
          }
        }
      });

      field.addEventListener('focus', function () {
        var message = document.querySelector('.' + field.className + ' + .message-incorrect');

        field.style.border = '2px solid transparent';
        if (message) {
          message.classList.add('message-incorrect--hidden');
        }
      });
    }
  };
})();

// Поп-ап "Заказать звонок"
(function () {
  var popup = document.querySelector('.order-call');
  var body = document.querySelector('body');
  var closeButton = document.querySelector('.order-call__close-button');
  var phoneField = document.querySelector('.order-call input[type=tel]');
  var nameField = document.querySelector('.order-call input[type=text]');
  var form = document.querySelector('.order-call form');

  window.orderCall = {
    open: function () {
      popup.classList.remove('order-call--hidden');
      body.classList.add('modal-opened');

      closeButton.addEventListener('click', this.onCloseButtonClick);
      popup.addEventListener('click', this.onPopupClick);
      document.addEventListener('keydown', this.onPressEsc);
      form.addEventListener('submit', this.onFormSubmit);

      window.storage.getValue(phoneField, 'popup-phone');
      window.storage.getValue(nameField, 'popup-name');
    },

    close: function () {
      popup.classList.add('order-call--hidden');
      body.classList.remove('modal-opened');

      closeButton.removeEventListener('click', this.onCloseButtonClick);
      popup.removeEventListener('click', this.onPopupClick);
      document.removeEventListener('keydown', this.onPressEsc);
      form.removeEventListener('submit', this.onFormSubmit);
    },

    onCloseButtonClick: function () {
      window.orderCall.close();
    },

    onPopupClick: function (evt) {
      if (evt.target.className === 'order-call') {
        window.orderCall.close();
      }
    },

    onPressEsc: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.orderCall.close();
      }
    },

    onFormSubmit: function (evt) {
      evt.preventDefault();

      window.storage.saveValue(phoneField, 'popup-phone');
      window.storage.saveValue(nameField, 'popup-name');

      window.orderCall.close();
      window.acceptedWindow.open();
    }
  };
})();

// Поп-ап "Заявка принята"
(function () {
  var popup = document.querySelector('.accepted-window');
  var body = document.querySelector('body');
  var closeButton = document.querySelector('.accepted-window__close-button');
  var okButton = document.querySelector('.accepted-window button[type=button]');

  window.acceptedWindow = {
    open: function () {
      popup.classList.remove('accepted-window--hidden');
      body.classList.add('modal-opened');

      closeButton.addEventListener('click', this.onCloseButtonClick);
      okButton.addEventListener('click', this.onOkButtonClick);
      popup.addEventListener('click', this.onPopupClick);
      document.addEventListener('keydown', this.onPressEsc);
    },

    close: function () {
      popup.classList.add('accepted-window--hidden');
      body.classList.remove('modal-opened');

      closeButton.removeEventListener('click', this.onCloseButtonClick);
      okButton.removeEventListener('click', this.onOkButtonClick);
      popup.removeEventListener('click', this.onPopupClick);
      document.removeEventListener('keydown', this.onPressEsc);
    },

    onCloseButtonClick: function () {
      window.acceptedWindow.close();
    },

    onOkButtonClick: function () {
      window.acceptedWindow.close();
    },

    onPopupClick: function (evt) {
      if (evt.target.className === 'accepted-window') {
        window.acceptedWindow.close();
      }
    },

    onPressEsc: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.acceptedWindow.close();
      }
    }
  };
})();


// LOCALE STORAGE
(function () {
  window.storage = {
    getValue: function (field, itemName) {
      var isStorageSupport = true;
      var storageItem = '';

      try {
        storageItem = localStorage.getItem(itemName);
      } catch (err) {
        isStorageSupport = false;
      }

      if (isStorageSupport) {
        field.value = storageItem;
      }
    },

    saveValue: function (field, itemName) {
      localStorage.setItem(itemName, field.value);
    }
  };
})();

// ГЛАВНАЯ
(function () {
  // Поле формы телефона
  var orderCallTelField = document.querySelector('.order-call input[type=tel]');
  // Кнопка открытия поп-апа "Заказать звонок"
  var orderCallButton = document.querySelector('.header-top__order-button');

  // Проверка поля телефона (Попап)
  window.form.markInvalidfields(orderCallTelField);


  orderCallButton.addEventListener('click', function () {
    window.orderCall.open();
  });
})();
