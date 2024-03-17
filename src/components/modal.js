export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', closeEscPopup);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup)
}

const closeEscPopup = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened')
    closePopup(popup);
  }
}