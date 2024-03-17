import '../pages/index.css';
import { createCard, removeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { initialCards } from './cards.js';


const cardsContainer = document.querySelector('.places__list');

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup')

const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const editForm = editPopup.querySelector('.popup__form');
const inputNameFormProfile = editForm.querySelector('.popup__input_type_name');
const inputDescFormProfile = editForm.querySelector('.popup__input_type_description');

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const inputNameNewCard = newCardForm.querySelector('.popup__input_type_card-name');
const inputUrlNewCard = newCardForm.querySelector('.popup__input_type_url');

const cardOverview = document.querySelector('.popup_type_image');
const cardOverviewImage = cardOverview.querySelector('.popup__image');
const cardOverviewDesc = cardOverview.querySelector('.popup__caption');

const addCard = (cardElement) => {
  cardsContainer.appendChild(cardElement);
}

const addCardToBeginning = (cardElement) => {
  const firstChild = cardsContainer.firstChild;
  cardsContainer.insertBefore(cardElement, firstChild);
}

const listenerCardImage = (e) => {
  const image = e.target;
  cardOverviewImage.src = image.src;
  cardOverviewImage.alt = image.alt;
  cardOverviewDesc.textContent = image.alt;
  openPopup(cardOverview);
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, listenerCardImage);
  addCard(card);
});

profileEditButton.addEventListener('click', () => {
  openPopup(editPopup);
  editFormDefault();
});

newCardButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup_is-opened');
    closePopup(popup);
  })
})

popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    const isClickInsidePopupContent = e.target.closest('.popup__content');
    if  (!isClickInsidePopupContent && popup.classList.contains('popup_is-opened')) {
      closePopup(popup)
    }
  })
})

const editFormDefault = () => {
  inputNameFormProfile.value = profileName.textContent;
  inputDescFormProfile.value = profileDesc.textContent;
}

const handleEditFormSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = inputNameFormProfile.value;
  profileDesc.textContent = inputDescFormProfile.value;
  closePopup(editPopup);
}

editForm.addEventListener('submit', handleEditFormSubmit);

const addNewCard = (e) => {
  e.preventDefault();
  const cardInfo = {
    name: inputNameNewCard.value,
    link: inputUrlNewCard.value
  }
  const newCard = createCard(cardInfo, removeCard, listenerCardImage); 
  addCardToBeginning(newCard);
  newCardForm.reset();
  closePopup(newCardPopup);
}

newCardForm.addEventListener('submit', addNewCard);