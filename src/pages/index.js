import "./index.css";

import {
  cardListSelector,
  popupCardPreviewSelector,
  popupPreviewImageSelector,
  popupPreviewCaptionSelector,
  popupAvatarSelector,
  popupProfileSelector,
  popupCreateCardSelector,
  popupSubmitSelector,
  validatorConfig,
  profileSelectors
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo.js';
import {
  apiData
} from "../utils/constants.js";
import {
  Card
} from '../components/Card.js';
import {
  FormValidator
} from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation";
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const api = new Api(apiData.baseUrl, apiData.groupId, apiData.header);

//Загрузка стартовых данных с сервера: профиль пользователя, карточки
const userInfo = new UserInfo(profileSelectors);

const cardList = new Section((item) => {
  const cardElement = createCard(item);
  cardList.setItem(cardElement);
}, cardListSelector);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([initialUser, initialCards]) => {
    userInfo.setInfo(initialUser);

    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err)
  });

function openPopupAvatarWindow() {
  formValidators[popupAvatar.getFormName()].resetValidation();
  popupAvatar.open();
}

function openPopupProfileWindow() {
  const values = [];
  const {name, description} = userInfo.getUserInfo();
  values['fullName'] = name;
  values['description'] = description;
  popupProfile.setFormValues(values);

  formValidators[popupProfile.getFormName()].resetValidation();
  popupProfile.open();
}

function handleProfileFormSubmit(formData) {
  popupProfile.setSavingText();
  const name = formData.fullName,
    description = formData.description;
  api.updateUserProfile({
      name: name,
      about: description
    })
    .then(() => {
      userInfo.setProfile({
        name: formData.fullName,
        description: formData.description
      });
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupProfile.setSubmitText();
    });
}

function handleAvatarFormSubmit(formData) {
  const url = formData.avatarUrl;
  popupAvatar.setSavingText();
  api.updateAvatar(url)
    .then(() => {
      userInfo.setAvatar(url);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatar.setSubmitText();
    });
}

//Карточки с фотографиями
function handleCardClick(name, link) {
  popupCardPreview.open(name, link);
}

function handleCardLike(card) {
  const userId = userInfo.getId();
  const method = card.isUserLiked(userId) ? 'DELETE' : 'PUT';
  api.updateLike(card.getId(), method)
    .then((res) => {
      card.updateLikes(res.likes, userId);
    })
    .catch((err) => {
      console.log(err)
    });
}

function handleCardDelete(card) {
  popupSubmit.open(card);
}

function deleteCardSubmit(card) {
  api.deleteCard(card.getId())
    .then(() => {
      card.deleteElement();
      popupSubmit.close();
    })
    .catch((err) => {
      console.log(err)
    });
}


function openPopupCardsWindow() {
  formValidators[popupCreateCard.getFormName()].resetValidation();
  popupCreateCard.open();
}

function handleCardFormSubmit(formData) {
  const name = formData.photoName,
    link = formData.photoUrl;
  popupCreateCard.setSavingText();
  api.addCard({
      name: name,
      link: link
    })
    .then((res) => {
      const cardElement = createCard(res);
      cardList.addItem(cardElement)
      popupCreateCard.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupCreateCard.setSavingText();
    });
}

profileAvatarButton.addEventListener('click', openPopupAvatarWindow);
profileEditButton.addEventListener('click', openPopupProfileWindow);

cardAddButton.addEventListener('click', openPopupCardsWindow);

function createCard(data) {

  const card = new Card(data, '#photo-template', handleCardClick, handleCardLike, handleCardDelete);
  return card.generateCard(userInfo.getId());
}

//Попап просмотра карточки
const popupCardPreview = new PopupWithImage(popupPreviewImageSelector, popupPreviewCaptionSelector, popupCardPreviewSelector);
popupCardPreview.setEventListeners();

//Попапы форм редактирования профиля, аватара, добавления карточки и подтверждения удаления
const popupProfile = new PopupWithForm(handleProfileFormSubmit, popupProfileSelector);
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(handleAvatarFormSubmit, popupAvatarSelector);
popupAvatar.setEventListeners();

const popupCreateCard = new PopupWithForm(handleCardFormSubmit, popupCreateCardSelector);
popupCreateCard.setEventListeners();

const popupSubmit = new PopupWithConfirmation(deleteCardSubmit, popupSubmitSelector);
popupSubmit.setEventListeners();

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
