// Функция открытия поп-апа
const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc); // Обработчик закрытия попапа нажатием на Esc
  }
  
  // Функция закрытия поп-апа
  const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
  }
  
  // Фукнция закрытия поп-апа кликом по оверлею
  const closePopUpByOverlay = (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.target);
    }
  }
  
  // Функция закрытия поп-апа кнопкой Esc
  const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_is-opened');
      closePopup(popupOpened);
    }
  }

  const closePopupByButton = (evt) => {
    closePopup(evt.target.closest('.popup'));
  }
  
  export { openPopup, closePopup, closePopUpByOverlay, closePopupByButton };