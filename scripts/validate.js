const showInputError = (formElement, inputElement, errorMessage) => {
  /*const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');*/
};

const hideInputError = (formElement, inputElement) => {
  /*const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';*/
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, inputSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = (elementSelectors) => {
  const formList = Array.from(document.querySelectorAll(elementSelectors.formSelector));
  formList.forEach((formElement) => {
    /*formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });*/

      setEventListeners(formElement, elementSelectors.inputSelector);
  });
};
