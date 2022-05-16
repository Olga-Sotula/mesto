import { onOpenPopupWindow } from "./index.js";

const popupPhotoPreviewWindow = document.querySelector('.popup_type_preview');
const popupPreviewImage = popupPhotoPreviewWindow.querySelector('.popup__image');
const popupPreviewCaption =   popupPhotoPreviewWindow.querySelector('.popup__caption');

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._element = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._elementLike = null;
    this._elementRemove = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo')
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPhotoPreviewWindow() {
    popupPreviewImage.src = this._link;
    popupPreviewImage.alt = this._name;
    popupPreviewCaption.textContent = this._name;
    onOpenPopupWindow(popupPhotoPreviewWindow);
  }

  _handleLikeToggle() {
    this._elementLike.classList.toggle('photo__like_active');
  }

  _handlePhotoDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {this._handleLikeToggle()});
    this._elementRemove.addEventListener('click', () => {this._handlePhotoDelete()});
    this._elementImage.addEventListener('click', () => {this._handleOpenPhotoPreviewWindow()});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.photo__title');
    this._elementLike = this._element.querySelector('.photo__like');
    this._elementRemove = this._element.querySelector('.photo__rm');
    this._elementImage = this._element.querySelector('.photo__img');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
