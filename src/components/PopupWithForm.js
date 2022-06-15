import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._submitText = this._submitButton.textContent;
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setFormValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  getFormName() {
    return this._form.getAttribute('name');
  }

  setSubmitText(){
    this._submitButton.textContent = this._submitText;
  }

  setSavingText() {
    this._submitButton.textContent = 'Сохранение ...';
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
