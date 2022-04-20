const showInputError = (formElement, inputElement, errorMessage,inputErrorClass) => {
  //const errorElement = formElement.querySelector(inputErrorClass);
  inputElement.classList.add(inputErrorClass);
  //errorElement.textContent = errorMessage;
  //errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  //errorElement.classList.remove('form__input-error_active');
  //errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement,inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const setEventListeners = (formElement, inputSelector, inputErrorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass);
    });
  });
};

const enableValidation = (elementSelectors) => {
  const formList = Array.from(document.querySelectorAll(elementSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

      setEventListeners(formElement, elementSelectors.inputSelector, elementSelectors.inputErrorClass);
  });
};
