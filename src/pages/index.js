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

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
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
      name,
      about
    } = initialUser;
    userInfo.setUserInfo({
      name: name,
      description: about
    });

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
      popupProfile.close();
    });
}

//Карточки с фотографиями
function handleCardClick(name, link) {
  popupCardPreview.open(name, link);
}


function openPopupCardsWindow() {
  formValidators[popupCreateCard.getFormName()].resetValidation();
  popupCreateCard.open();
}

function handleCardFormSubmit(formData) {
  const name = formData.photoName,
    link = formData.photoUrl;
  api.addCard({
      name: name,
      link: link
    })
    .then((res) => {
      const cardElement = createCard({
        name: name,
        link: link
      });
      cards.unshift(res);
      cardList.addItem(cardElement)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupCreateCard.close();
    });
}

profileEditButton.addEventListener('click', openPopupProfileWindow);

cardAddButton.addEventListener('click', openPopupCardsWindow);

function createCard(data) {

  const card = new Card(data, '#photo-template', handleCardClick);
  return card.generateCard();
}





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
