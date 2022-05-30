import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
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

  setFormValues(inputs) {
    inputs.forEach(input => {
      this._form.querySelector(input.selector).value = input.value;
    })
  }

  getForm() {
    return this._form;
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
