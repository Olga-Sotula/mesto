const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const photoContainer = document.querySelector('.photos__grid');
const popupProfileForm = document.querySelector('.popup__form_type_profile');
const popupInputName = popupProfileForm.querySelector('.popup__input_type_fullname');
const popupInputDescription = popupProfileForm.querySelector('.popup__input_type_description');

let currentPopupWindow = null;

function addPhoto(titleValue, urlValue) {
  const photoTemplate = document.querySelector('#photo-template').content;
  const photoElement = photoTemplate.querySelector('.photo').cloneNode(true);

  photoElement.querySelector('.photo__title').textContent = titleValue;
  photoElement.querySelector('.photo__img').src = urlValue;
  photoElement.querySelector('.photo__img').alt = titleValue;
  photoContainer.prepend(photoElement);
}

function addInitialPhotos(){
  for (let i = initialCards.length - 1; i >= 0; i--) {
    addPhoto(initialCards[i].name, initialCards[i].link);
  }
}

function onOpenPopupProfileWindow(){
  popupProfileWindow.classList.add('popup_opened');
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  currentPopupWindow = popupProfileWindow;
}

function onClosePopupWindow(){
  if (currentPopupWindow) {
    currentPopupWindow.classList.remove('popup_opened');
    popupWindow = null;
  }
}

function onSubmitPopupProfileWindow(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  onClosePopupWindow();
}

popupCloseButton.addEventListener('click', onClosePopupWindow);
profileEditButton.addEventListener('click', onOpenPopupProfileWindow);
popupProfileForm.addEventListener('submit',onSubmitPopupProfileWindow);

addInitialPhotos();
/*#TODO добавить отклики на кнопки лайков
const likeButtons = document.querySelectorAll('.photos__like');

function onLikeToggle(evt) {
  evt.target.classList.toggle('photos__like_liked');
}

for (let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener("click", onLikeToggle);
}
*/
