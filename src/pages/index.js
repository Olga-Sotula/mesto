import "./index.css";

import {
  initialUserInfo,
  cardListSelector,
  popupCardPreviewSelector,
  popupPreviewImageSelector,
  popupPreviewCaptionSelector,
  popupProfileSelector,
  popupProfileNameSelector,
  popupProfileDescriptionSelector,
  popupCreateCardSelector,
  validatorConfig
} from '../utils/constants.js';

import { initialCards } from '../utils/cards.js';
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

//Профиль пользователя
const userInfo = new UserInfo(initialUserInfo);

function openPopupProfileWindow(){
  const d = userInfo.getUserInfo();
  popupProfile.getForm().querySelector(popupProfileNameSelector).value = userInfo.getUserInfo().name;
  popupProfile.getForm().querySelector(popupProfileDescriptionSelector).value = userInfo.getUserInfo().description;
  formValidators[popupProfile.getForm().getAttribute('name')].resetValidation();
  popupProfile.open();
}

function handleProfileFormSubmit(formData){
  userInfo.setUserInfo({name:formData.fullName, description: formData.description});
  profileTitle.textContent = formData.fullName;
  profileSubtitle.textContent = formData.description;
  popupProfile.close();
}

//Карточки с фотографиями
function handleCardClick(name, link){
  popupCardPreview.open(name, link);
}


function openPopupCardsWindow(){
  formValidators[popupCreateCard.getForm().getAttribute('name')].resetValidation();
  popupCreateCard.open();
}

function handleCardFormSubmit(formData){
  const cardElement = createCard({name: formData.photoName, link: formData.photoUrl});
  defaultCardList.addItem(cardElement);
  popupCreateCard.close();
}

profileEditButton.addEventListener('click', openPopupProfileWindow);

cardAddButton.addEventListener('click', openPopupCardsWindow);

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

//Попап просмотра карточки
const popupCardPreview = new PopupWithImage(popupPreviewImageSelector, popupPreviewCaptionSelector, popupCardPreviewSelector);
popupCardPreview.setEventListeners();

//Попапы форм редактирования профиля и добавления карточки
const popupProfile = new PopupWithForm(handleProfileFormSubmit, popupProfileSelector);
popupProfile.setEventListeners();

const popupCreateCard = new PopupWithForm(handleCardFormSubmit, popupCreateCardSelector);
popupCreateCard.setEventListeners();

// Включение валидации
const formValidators = {};

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

