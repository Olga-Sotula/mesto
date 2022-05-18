
export class FormValidator {
  constructor (config, formElement){
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showInputError (input, errorMessage) {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${input.name}`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${input.name}`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    })
  }

  enableValidation () {
    this._setEventListeners();
    /*const formList = Array.from(document.querySelectorAll(elementSelectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

        setEventListeners(formElement, elementSelectors.inputSelector, elementSelectors.inputErrorClass, elementSelectors.errorClass, elementSelectors.submitButtonSelector, elementSelectors.inactiveButtonClass);
    });*/
  }
}


/*const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement,inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};*/

/*const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}*/

/*const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};*/

/*const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};


*/
