import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

  open(element, id) {
    this._cardElement = element;
    this._cardId = id;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardElement, this._cardId);
    })
    super.setEventListeners();
  }


}
