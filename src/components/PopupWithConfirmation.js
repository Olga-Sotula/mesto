import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    })
    super.setEventListeners();
  }


}
