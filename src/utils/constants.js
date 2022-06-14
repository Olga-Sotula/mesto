export const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-43',
  tocken: '94d6e346-3932-4dc4-bc64-13113fb0f452'
}

export const initialUserInfo = {id: "", name: "", description: ""};

export const cardListSelector = '.photos__grid';

export const popupCardPreviewSelector = '.popup_type_preview';
export const popupPreviewImageSelector = '.popup__image';
export const popupPreviewCaptionSelector = '.popup__caption';

export const popupProfileSelector = '.popup_type_profile';
export const popupProfileNameSelector = '.popup__input_type_fullname';
export const popupProfileDescriptionSelector = '.popup__input_type_description';

export const popupCreateCardSelector = '.popup_type_cards';

export const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
