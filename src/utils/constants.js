export const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-43',
  header: {
    'authorization': '94d6e346-3932-4dc4-bc64-13113fb0f452',
    'Content-Type': 'application/json'
  }
}

export const cardListSelector = '.photos__grid';

export const popupCardPreviewSelector = '.popup_type_preview';
export const popupPreviewImageSelector = '.popup__image';
export const popupPreviewCaptionSelector = '.popup__caption';

export const popupAvatarSelector = '.popup_type_avatar';

export const popupProfileSelector = '.popup_type_profile';

export const popupCreateCardSelector = '.popup_type_cards';

export const popupSubmitSelector = '.popup_type_submit';

export const validatorConfig = {
  formSelector: '.popup__form_validated',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const profileSelectors = {
  title: '.profile__title',
  subtitle: '.profile__subtitle',
  avatar: '.profile__avatar',
  avatarButton: '.profile__avatar-button',
  editButton: '.profile__edit-button'
};
