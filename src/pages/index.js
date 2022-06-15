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

const cardAddButton = document.querySelector('.profile__add-button');

const api = new Api(apiData.baseUrl, apiData.groupId, apiData.header);

//Загрузка стартовых данных с сервера: профиль пользователя, карточки
const userInfo = new UserInfo(profileSelectors);
let cards = [];
let cardList = null;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([initialUser, initialCards]) => {
    userInfo.setInfo(initialUser);
    cardList = new Section((item) => {
      const cardElement = createCard(item);
      cardList.setItem(cardElement);
    }, cardListSelector);

    cardList.renderItems(initialCards);

    userInfo.renderProfile();
  })
  .catch((err) => {
    console.log(err)
  });

function openPopupAvatarWindow() {
  const values = [];
  values['avatarUrl'] = userInfo.getAvatar();
  popupAvatar.setFormValues(values);
  formValidators[popupAvatar.getFormName()].resetValidation();
  popupAvatar.open();
}

function openPopupProfileWindow() {
  const values = [];
  values['fullName'] = userInfo.getUserInfo().name;
  values['description'] = userInfo.getUserInfo().description;
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
      userInfo.renderProfile();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupProfile.setSubmitText();
      popupProfile.close();
    });
}

function handleAvatarFormSubmit(formData) {
  const url = formData.avatarUrl;
  popupAvatar.setSavingText();
  api.updateAvatar(url)
    .then(() => {
      userInfo.setAvatar(url);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatar.setSubmitText();
      popupAvatar.close();
    });
}

//Карточки с фотографиями
function handleCardClick(name, link) {
  popupCardPreview.open(name, link);
}

function handleCardLike(card) {
  const likeButton = card.getLikeButton();
  const method = likeButton.classList.contains('photo__like-button_active') ? 'DELETE' : 'PUT';
  api.updateLike(card.getId(), method)
    .then((res) => {
      card.updateLikes(res.likes, userInfo.getId());
    })
    .catch((err) => {
      console.log(err)
    });
}

function handleCardDelete(element, id) {
  popupSubmit.open(element, id);
}

function deleteCardSubmit(element, id) {
  api.deleteCard(id)
    .then(() => {
      element.remove();
      element = null;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupSubmit.close();
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
      cards.unshift(res);
      cardList.addItem(cardElement)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupCreateCard.setSavingText();
      popupCreateCard.close();
    });
}

userInfo.setEventListeners(openPopupAvatarWindow, openPopupProfileWindow);

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
