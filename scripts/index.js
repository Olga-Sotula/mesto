const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const photoContainer = document.querySelector('.photos__grid');

const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.popup__form_type_profile');
const popupInputName = popupProfileForm.querySelector('.popup__input_type_fullname');
const popupInputDescription = popupProfileForm.querySelector('.popup__input_type_description');
const popupCardsWindow = document.querySelector('.popup_type_cards');
const popupCardsForm = document.querySelector('.popup__form_type_cards');
const popupCardsNameInput = document.querySelector('.popup__input_type_photo-name');
const popupCardsUrlInput = document.querySelector('.popup__input_type_photo-url');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupPhotoPreviewWindow = document.querySelector('.popup_type_preview');

let currentPopupWindow = null;

function addPhoto(titleValue, urlValue) {
  const photoTemplate = document.querySelector('#photo-template').content;
  const photoElement = photoTemplate.querySelector('.photo').cloneNode(true);
  photoElement.querySelector('.photo__title').textContent = titleValue;
  photoElement.querySelector('.photo__img').src = urlValue;
  photoElement.querySelector('.photo__img').alt = titleValue;
  photoElement.querySelector('.photo__like').addEventListener('click', onLikeToggle);
  photoElement.querySelector('.photo__rm').addEventListener('click', onPhotoDelete);
  photoElement.querySelector('.photo__img').addEventListener('click', onOpenPhotoPreviewWindow);
  photoContainer.prepend(photoElement);
}

function addInitialPhotos(){
  for (let i = initialCards.length - 1; i >= 0; i--) {
    addPhoto(initialCards[i].name, initialCards[i].link);
  }
}

function onLikeToggle(evt) {
  evt.target.classList.toggle('photo__like_active');
}

function onPhotoDelete(evt) {
  evt.target.closest('.photo').remove();
}

function onOpenPopupWindow(wnd){
  wnd.classList.add('popup_opened');
  currentPopupWindow = wnd;
}

function onClosePopupWindow(){
  if (currentPopupWindow) {
    currentPopupWindow.classList.remove('popup_opened');
    popupWindow = null;
  }
}

function onOpenPhotoPreviewWindow(evt) {
  onOpenPopupWindow(popupPhotoPreviewWindow);
  popupPhotoPreviewWindow.querySelector('.popup__image').src = evt.target.src;
  popupPhotoPreviewWindow.querySelector('.popup__image').alt = evt.target.parentElement.querySelector('.photo__title').textContent;
  popupPhotoPreviewWindow.querySelector('.popup__caption').textContent = evt.target.parentElement.querySelector('.photo__title').textContent;
}

function onOpenPopupProfileWindow(){
  onOpenPopupWindow(popupProfileWindow);
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

function onSubmitPopupProfileWindow(evt){
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  onClosePopupWindow();
}

function onOpenPopupCardsWindow(){
  onOpenPopupWindow(popupCardsWindow);
  popupCardsNameInput.value = '';
  popupCardsUrlInput.value = '';
}

function onSubmitPopupCardsWindow(evt){
  evt.preventDefault();
  const photoTitle = popupCardsNameInput.value;
  const photoUrl = popupCardsUrlInput.value;
  addPhoto(photoTitle, photoUrl);
  onClosePopupWindow();
}

popupCloseButtons.forEach(elem => {elem.addEventListener('click', onClosePopupWindow)});
profileEditButton.addEventListener('click', onOpenPopupProfileWindow);
popupProfileForm.addEventListener('submit',onSubmitPopupProfileWindow);
cardAddButton.addEventListener('click', onOpenPopupCardsWindow);
popupCardsForm.addEventListener('submit',onSubmitPopupCardsWindow);

addInitialPhotos();
