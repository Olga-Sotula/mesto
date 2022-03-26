const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupWindow = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const popupInputName = popupForm.querySelector('.popup__input_type_name');
const popupInputDescription = popupForm.querySelector('.popup__input_type_description');

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

function formSubmitHandler(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  togglePopupWindow();
}

popupCloseButton.addEventListener('click', onClosePopupWindow);
profileEditButton.addEventListener('click', onOpenPopupWindow);
popupForm.addEventListener('submit',formSubmitHandler);

