import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(imageSelector, captionSelector, popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open(caption, link) {
    this._image.src = link;
    this._image.alt = caption;
    this._caption.textContent = caption;
    super.open();
  }

}
