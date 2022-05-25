import {
  cardListSelector,
  popupCardPreviewSelector,
  popupPreviewImageSelector,
  popupPreviewCaptionSelector,
  popupProfileSelector,
  popupProfileNameSelector,
  popupProfileDescriptionSelector,
  popupCreateCardSelector
} from '../utils/constants.js';

import { openPopupWindow, closePopupWindow } from "../scripts/utils.js";
import { initialCards } from '../utils/cards.js';
import Section from "../components/Section.js";
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const popupCardsForm = document.querySelector('.popup__form_type_cards');
const popupCardsNameInput = document.querySelector('.popup__input_type_photo-name');
const popupCardsUrlInput = document.querySelector('.popup__input_type_photo-url');

function handleCardClick(name, link){
  popupCardPreview.open(name, link);
}

function openPopupProfileWindow(){
  popupProfile.getForm().querySelector(popupProfileNameSelector).value = profileTitle.textContent;
  popupProfile.getForm().querySelector(popupProfileDescriptionSelector).value = profileSubtitle.textContent;
  formValidators[popupProfile.getForm().getAttribute('name')].resetValidation();
  popupProfile.open();
}

function handleProfileFormSubmit(formData){
  profileTitle.textContent = formData.fullName;
  profileSubtitle.textContent = formData.description;
  popupProfile.close();
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
  defaultCardList.addItem(cardElement);
  closePopupWindow(popupCardsWindow);
}

profileEditButton.addEventListener('click', openPopupProfileWindow);

cardAddButton.addEventListener('click', openPopupCardsWindow);
popupCardsForm.addEventListener('submit',handleCardFormSubmit);

//addInitialPhotos();
//Отрисовка карточек
function createCard(data){
  const card = new Card(data, '#photo-template', handleCardClick);
  return card.generateCard();
}

const defaultCardList = new Section({data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.setItem(cardElement);
  }}, cardListSelector);

defaultCardList.renderItems();

const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formValidators = {}

//Попап просмотра карточки
const popupCardPreview = new PopupWithImage(popupPreviewImageSelector, popupPreviewCaptionSelector, popupCardPreviewSelector);
popupCardPreview.setEventListeners();

//Попапы форм редактирования профиля и добавления карточки
const popupProfile = new PopupWithForm(handleProfileFormSubmit, popupProfileSelector);
popupProfile.setEventListeners();

const popupCreateCard = new PopupWithForm(handleCardFormSubmit, popupCreateCardSelector);
popupCreateCard.setEventListeners();

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

