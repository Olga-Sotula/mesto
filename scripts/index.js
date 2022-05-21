import { onOpenPopupWindow, onClosePopupWindow } from "./utils.js";
import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
const popupPhotoPreviewWindow = document.querySelector('.popup_type_preview');
const popupPreviewImage = popupPhotoPreviewWindow.querySelector('.popup__image');
const popupPreviewCaption =   popupPhotoPreviewWindow.querySelector('.popup__caption');

function addInitialPhotos(){
  initialCards.forEach((item) => {
    const card = new Card(item, '#photo-template', handleCardClick);
    const cardElement = card.generateCard();

    photoContainer.append(cardElement);
  });
}

function handleCardClick(name, link){
  popupPreviewImage.src = link;
  popupPreviewImage.alt = name;
  popupPreviewCaption.textContent = name;
  onOpenPopupWindow(popupPhotoPreviewWindow);
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
  const card = new Card({name: photoTitle, link: photoUrl}, '#photo-template', handleCardClick);
  const cardElement = card.generateCard();
  photoContainer.prepend(cardElement);
  onClosePopupWindow(popupCardsWindow);
}

profileEditButton.addEventListener('click', onOpenPopupProfileWindow);
popupProfileForm.addEventListener('submit',onSubmitPopupProfileWindow);
cardAddButton.addEventListener('click', onOpenPopupCardsWindow);
popupCardsForm.addEventListener('submit',onSubmitPopupCardsWindow);

addInitialPhotos();

const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const addValidation = () => {
  const forms = Array.from(document.querySelectorAll(validatorConfig.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(validatorConfig, form);
    validator.enableValidation();
  });
};

addValidation();

