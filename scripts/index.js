const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupWindow = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const popupInputName = popupForm.querySelector('.popup__input_type_name');
const popupInputDescription = popupForm.querySelector('.popup__input_type_description');

function onOpenPopupWindow(){
  popupWindow.classList.add('popup_opened');
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

function onClosePopupWindow(){
  popupWindow.classList.remove('popup_opened');
}

function onSubmitPopupWindow(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  popupWindow.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', onClosePopupWindow);
profileEditButton.addEventListener('click', onOpenPopupWindow);
popupForm.addEventListener('submit',onSubmitPopupWindow);

/*#TODO добавить отклики на кнопки лайков
const likeButtons = document.querySelectorAll('.photos__like');

function onLikeToggle(evt) {
  evt.target.classList.toggle('photos__like_liked');
}

for (let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener("click", onLikeToggle);
}
*/
