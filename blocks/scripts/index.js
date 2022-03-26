const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupWindow = document.querySelector('.popup');
const poupForm = document.querySelector('.popup__form');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');

function togglePopupWindow() {
  popupWindow.classList.toggle('popup_opened');
}

function onOpenPopupWindow(){
  togglePopupWindow();
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

function onClosePopupWindow(){
  togglePopupWindow();
}


popupCloseButton.addEventListener('click', onClosePopupWindow);
profileEditButton.addEventListener('click', onOpenPopupWindow);

