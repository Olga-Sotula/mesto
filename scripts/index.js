const popupWindow = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');

function togglePopupWindow() {
  popupWindow.classList.toggle('popup_opened');
}

popupCloseButton.addEventListener('click', togglePopupWindow);
profileEditButton.addEventListener('click', togglePopupWindow);

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    togglePopupWindow();
  }
}

popupWindow.addEventListener('click', onOverlayClick);
