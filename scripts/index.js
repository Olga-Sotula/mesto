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
const popupPreviewImage = popupPhotoPreviewWindow.querySelector('.popup__image');
const popupPreviewCaption =   popupPhotoPreviewWindow.querySelector('.popup__caption');
const photoTemplate = document.querySelector('#photo-template').content;

function getCard(card) {
  const photoElement = photoTemplate.querySelector('.photo').cloneNode(true);
  const photoImg = photoElement.querySelector('.photo__img');
  photoElement.querySelector('.photo__title').textContent = card.name;
  photoImg.src = card.link;
  photoImg.alt = card.name;
  photoElement.querySelector('.photo__like').addEventListener('click', onLikeToggle);
  photoElement.querySelector('.photo__rm').addEventListener('click', onPhotoDelete);
  photoImg.addEventListener('click', onOpenPhotoPreviewWindow);
  return photoElement;
}

function addInitialPhotos(){
  const cards = initialCards.map(getCard);
  photoContainer.append(...cards);
}

function onLikeToggle(evt) {
  evt.target.classList.toggle('photo__like_active');
}

function onPhotoDelete(evt) {
  evt.target.closest('.photo').remove();
}

function onOpenPopupWindow(popup){
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeyPopup);
}

function onClosePopupWindow(popup){
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleKeyPopup);
}

function onOpenPhotoPreviewWindow(evt) {
  onOpenPopupWindow(popupPhotoPreviewWindow);
  popupPreviewImage.src = evt.target.src;
  popupPreviewImage.alt = evt.target.parentElement.querySelector('.photo__title').textContent;
  popupPreviewCaption.textContent = evt.target.parentElement.querySelector('.photo__title').textContent;
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
  onClosePopupWindow(popupProfileWindow);
}

function onOpenPopupCardsWindow(){
  onOpenPopupWindow(popupCardsWindow);
  popupCardsForm.reset();
}

function onSubmitPopupCardsWindow(evt){
  evt.preventDefault();
  const photoTitle = popupCardsNameInput.value;
  const photoUrl = popupCardsUrlInput.value;
  const card = getCard({name: photoTitle, link: photoUrl});
  photoContainer.prepend(card);
  onClosePopupWindow(popupCardsWindow);
}

function handleOverlayClick(evt) {
  const popup = evt.currentTarget;
  if ((evt.target === popup)||(evt.target.classList.contains('popup__close'))) {
    onClosePopupWindow(popup);
  }
}

function handleKeyPopup(evt){
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    onClosePopupWindow(popup);
  }
}

profileEditButton.addEventListener('click', onOpenPopupProfileWindow);
popupProfileForm.addEventListener('submit',onSubmitPopupProfileWindow);
cardAddButton.addEventListener('click', onOpenPopupCardsWindow);
popupCardsForm.addEventListener('submit',onSubmitPopupCardsWindow);

addInitialPhotos();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
