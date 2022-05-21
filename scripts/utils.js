function handleOverlayClick(evt) {
  const popup = evt.currentTarget;
  if ((evt.target === popup)||(evt.target.classList.contains('popup__close'))) {
    closePopupWindow(popup);
  }
}

function handleKeyPopup(evt){
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    closePopupWindow(popup);
  }
}

function openPopupWindow(popup){
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeyPopup);
}

function closePopupWindow(popup){
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleKeyPopup);
}


export {openPopupWindow, closePopupWindow};
