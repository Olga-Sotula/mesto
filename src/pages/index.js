import "./index.css";

import {
  initialUserInfo,
  cardListSelector,
  popupCardPreviewSelector,
  popupPreviewImageSelector,
  popupPreviewCaptionSelector,
  popupAvatarSelector,
  popupAvatarUrlSelector,
  popupProfileSelector,
  popupProfileNameSelector,
  popupProfileDescriptionSelector,
  popupCreateCardSelector,
  popupSubmitSelector,
  validatorConfig
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
import PopupWithSubmit from "../components/PopupWithSubmit";

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const api = new Api(apiData.baseUrl, apiData.groupId, apiData.tocken);

//Загрузка стартовых данных с сервера: профиль пользователя, карточки
const userInfo = new UserInfo(initialUserInfo)
let cards = [];
let cardList = null;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([initialUser, initialCards]) => {
    const {
      _id,
      avatar,
      name,
      about
    } = initialUser;
    userInfo.setUserInfo({
      name: name,
      description: about
    });
    userInfo.setId(_id);
    userInfo.setAvatar(avatar);
    profileAvatar.src = userInfo.getAvatar();
    cards = cards.concat(initialCards);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderProfile();

    cardList = new Section({
      data: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardList.setItem(cardElement);
      }
    }, cardListSelector);

    cardList.renderItems();
  });

function openPopupAvatarWindow() {
  popupAvatar.setFormValues([{
    value: userInfo.getAvatar(),
    selector: popupAvatarUrlSelector
  }]);

  formValidators[popupAvatar.getFormName()].resetValidation();
  popupAvatar.open();
}

function openPopupProfileWindow() {
  popupProfile.setFormValues([{
      value: userInfo.getUserInfo().name,
      selector: popupProfileNameSelector
    },
    {
      value: userInfo.getUserInfo().description,
      selector: popupProfileDescriptionSelector
    }
  ]);

  formValidators[popupProfile.getFormName()].resetValidation();
  popupProfile.open();
}

function renderProfile() {
  const {
    name,
    description
  } = userInfo.getUserInfo();
  profileTitle.textContent = name;
  profileSubtitle.textContent = description;
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
      userInfo.setUserInfo({
        name: formData.fullName,
        description: formData.description
      });
      renderProfile();
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
      profileAvatar.src = userInfo.getAvatar();
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

profileAvatar.addEventListener('click', openPopupAvatarWindow);
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

const popupSubmit = new PopupWithSubmit(deleteCardSubmit, popupSubmitSelector);
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
