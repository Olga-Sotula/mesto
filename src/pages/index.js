import { openPopupWindow, closePopupWindow } from "../scripts/utils.js";
import { initialCards } from '../components/cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const photoContainer = document.querySelector('.photos__grid');

const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.popup__form_type_profile');
const popupInputName = popupProfileForm.querySelector('.popup__input_type_fullname');
const popupInputDescription = popupProfileForm.querySelector('.popup__input_type_description');
const popupCardsWindow = document.querySelector('.popup_type_cards');
const popupCardsForm = document.querySelector('.popup__form_type_cards');
const popupCardsNameInput = document.querySelector('.popup__input_type_photo-name');
const popupCardsUrlInput = document.querySelector('.popup__input_type_photo-url');
const popupPhotoPreviewWindow = document.querySelector('.popup_type_preview');
const popupPreviewImage = popupPhotoPreviewWindow.querySelector('.popup__image');
const popupPreviewCaption =   popupPhotoPreviewWindow.querySelector('.popup__caption');

function createCard(data){
  const card = new Card(data, '#photo-template', handleCardClick);
  return card.generateCard();
}

function addInitialPhotos(){
  const cards = initialCards.map(createCard);
  photoContainer.append(...cards);
}

function handleCardClick(name, link){
  popupPreviewImage.src = link;
  popupPreviewImage.alt = name;
  popupPreviewCaption.textContent = name;
  openPopupWindow(popupPhotoPreviewWindow);
}

function openPopupProfileWindow(){
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  formValidators[popupProfileForm.getAttribute('name')].resetValidation();
  openPopupWindow(popupProfileWindow);
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopupWindow(popupProfileWindow);
}

function openPopupCardsWindow(){
  popupCardsForm.reset();
  formValidators[popupCardsForm.getAttribute('name')].resetValidation();
  openPopupWindow(popupCardsWindow);
}

function handleCardFormSubmit(evt){
  evt.preventDefault();
  const photoTitle = popupCardsNameInput.value;
  const photoUrl = popupCardsUrlInput.value;
  const cardElement = createCard({name: photoTitle, link: photoUrl});
  photoContainer.prepend(cardElement);
  closePopupWindow(popupCardsWindow);
}

profileEditButton.addEventListener('click', openPopupProfileWindow);
popupProfileForm.addEventListener('submit',handleProfileFormSubmit);
cardAddButton.addEventListener('click', openPopupCardsWindow);
popupCardsForm.addEventListener('submit',handleCardFormSubmit);

addInitialPhotos();

const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validatorConfig);

