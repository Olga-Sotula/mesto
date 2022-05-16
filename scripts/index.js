//import {Card} from '../scripts/Card';
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const photoContainer = document.querySelector('.photos__grid');

const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.popup__form_type_profile');
const popupInputName = popupProfileForm.querySelector('.popup__input_type_fullname');
const popupInputDescription = popupProfileForm.querySelector('.popup__input_type_description');
const popupProfileSubmit = popupProfileForm.querySelector('.popup__submit');
const popupCardsWindow = document.querySelector('.popup_type_cards');
const popupCardsForm = document.querySelector('.popup__form_type_cards');
const popupCardsNameInput = document.querySelector('.popup__input_type_photo-name');
const popupCardsUrlInput = document.querySelector('.popup__input_type_photo-url');
const popupCardsSubmit = popupCardsForm.querySelector('.popup__submit');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupPhotoPreviewWindow = document.querySelector('.popup_type_preview');
const popupPreviewImage = popupPhotoPreviewWindow.querySelector('.popup__image');
const popupPreviewCaption =   popupPhotoPreviewWindow.querySelector('.popup__caption');
const photoTemplate = document.querySelector('#photo-template').content;


/* class card*/

class Card {
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

function addInitialPhotos(){
  initialCards.forEach((item) => {
    const card = new Card(item, '#photo-template');
    const cardElement = card.generateCard();

    photoContainer.append(cardElement);
  });
}


function onOpenPopupWindow(popup){
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeyPopup);
}

function onClosePopupWindow(popup){
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleKeyPopup);
}

function resetFormErrors(form){
  const errorClasses = ['popup__input_type_error', 'popup__error_visible'];
  errorClasses.forEach(errorClass => {
    Array.from(form.querySelectorAll(`.${errorClass}`)).forEach(elem => {
      elem.classList.remove(errorClass);
    });
  });
}

function setSubmitDisabled(button, isDisabled){
  button.classList.toggle('popup__submit_disabled', isDisabled);
  button.disabled = isDisabled;
}

function onOpenPopupProfileWindow(){
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  resetFormErrors(popupProfileForm)
  setSubmitDisabled(popupProfileSubmit, false);
  onOpenPopupWindow(popupProfileWindow);
}

function onSubmitPopupProfileWindow(evt){
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  onClosePopupWindow(popupProfileWindow);
}

function onOpenPopupCardsWindow(){
  popupCardsForm.reset();
  resetFormErrors(popupCardsForm)
  setSubmitDisabled(popupCardsSubmit, true);
  onOpenPopupWindow(popupCardsWindow);
}

function onSubmitPopupCardsWindow(evt){
  evt.preventDefault();
  const photoTitle = popupCardsNameInput.value;
  const photoUrl = popupCardsUrlInput.value;
  const card = new Card({name: photoTitle, link: photoUrl}, '#photo-template');
  const cardElement = card.generateCard();
  photoContainer.prepend(cardElement);
  onClosePopupWindow(popupCardsWindow);
}

function handleOverlayClick(evt) {
  const popup = evt.currentTarget;
  if ((evt.target === popup)||(evt.target.classList.contains('popup__close'))) {
    onClosePopupWindow(popup);
  }
}

function handleKeyPopup(evt){
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    onClosePopupWindow(popup);
  }
}

profileEditButton.addEventListener('click', onOpenPopupProfileWindow);
popupProfileForm.addEventListener('submit',onSubmitPopupProfileWindow);
cardAddButton.addEventListener('click', onOpenPopupCardsWindow);
popupCardsForm.addEventListener('submit',onSubmitPopupCardsWindow);

addInitialPhotos();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
