import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

  open(id) {
    this._cardId = id;
    super.open();
  }

  /*_getInputValues() {
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

  getFormName() {
    return this._form.getAttribute('name');
  }*/

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardId);
    })
    super.setEventListeners();
  }


}
