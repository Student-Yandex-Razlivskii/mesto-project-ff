import '../pages/index.css';
import { createCard, deleteCard, likeCard, cardDeleteConfig} from './card.js';
import { openPopup, closePopup, closePopUpByOverlay, closePopupByButton } from './modal.js';
import { validationSettings, enableValidation, clearValidation} from './validation.js';
import {
  config,
  getUserProfile,
  getCards,
  patchEditedUserProfile,
  postCard,
  patchAvatar,
  deleteCardFromServer
} from './api.js';

//  Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const page = document.querySelector('.page');
const cardsContainer = page.querySelector('.places__list');
const popups = page.querySelectorAll('.popup');
const editPopup = page.querySelector('.popup_type_edit');
const popupAddCard = page.querySelector('.popup_type_new-card');
const popupImage = page.querySelector('.popup_type_image');
const imagePopup = page.querySelector('.popup__image');
const captionImagePopup = page.querySelector('.popup__caption');
const profileName = page.querySelector('.profile__title');
const inputProfileName = page.querySelector('.popup__input_type_name');
const profileDesc = page.querySelector('.profile__description');
const inputprofileDesc = page.querySelector(
  '.popup__input_type_description'
);
const formAddCard = page.querySelector('.popup_type_new-card .popup__form');
const inputPlaceNameForm = formAddCard.querySelector(
  '.popup__input_type_card-name'
);
const inputLinkImageForm = formAddCard.querySelector('.popup__input_type_url');
const formEditProfile = page.querySelector('.popup_type_edit .popup__form');
const profileEditButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');
const popupCloseButtons = page.querySelectorAll('.popup__close');
const profileImage = page.querySelector('.profile__image');
const avatarProfile = page.querySelector('.profile__image');
const popupAvatar = page.querySelector('.popup_type_avatar');
const inputAvatarLink = page.querySelector('.popup__input_type_avatar-link');
const formAvatar = page.querySelector('.popup_type_avatar .popup__form');

const popupConfirmDeleteCard = page.querySelector('.popup_type_confirm');
const formConfirmDeleteCard = page.querySelector(
  '.popup_type_confirm .popup__form'
);

// Получение массива объектов карточек с сервера, объекта с информацией о пользователе, вставка их в DOM
Promise.all([getCards(config), getUserProfile(config)])
  .then(([cards, userData]) => {
    profileName.textContent = userData.name; // Добавление имени пользователя в DOM
    profileDesc.textContent = userData.about; // Добавление описания пользователя в DOM
    profileImage.style.backgroundImage = `url(${userData.avatar})`; // Добавление ссылки на картинку для аватара в DOM
    const currentUserId = userData._id; // Запись id пользователя

    cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          card,
          likeCard,
          openPopupImage,
          currentUserId,
          openPopupConfirmDeleteCard
        )
      );
    });
  })
  .catch((err) => console.log(err));

// Функция открытия поп-апа подтверждения удаления карточки
const openPopupConfirmDeleteCard = () => {
  openPopup(popupConfirmDeleteCard);
}

// Обработчик отправки формы подтверждения удаления карточки
formConfirmDeleteCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCardFromServer(config, cardDeleteConfig.cardIdToDelete)
    .then(() => {
      deleteCard(cardDeleteConfig.cardElementToDelete);
      closePopup(popupConfirmDeleteCard);
    })
    .catch((err) => console.log(err));
});

// Функция открытия поп-апа смены аватара
const openPopupAvatar = () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationSettings);
  openPopup(popupAvatar);
}

// Функция смены аватара профиля
const  handleFormAvatarSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  const newAvatarLink = inputAvatarLink.value;
  patchAvatar(config, newAvatarLink)
    .then((userDataEdited) => {
      avatarProfile.style.backgroundImage = `url(${userDataEdited.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupAvatar);
    });
  
}

// Функция открытия поп-апа редактирования профиля
const openPopupProfileEdit = () => {
  inputProfileName.value = profileName.textContent;
  inputprofileDesc.value = profileDesc.textContent;
  clearValidation(formEditProfile, validationSettings);
  openPopup(editPopup);
}

// Функция изменения данных профиля
const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, editPopup);
  const nameValue = inputProfileName.value;
  const descriptionValue = inputprofileDesc.value;
  patchEditedUserProfile(config, nameValue, descriptionValue)
    .then((userDataEdited) => {
      profileName.textContent = userDataEdited.name;
      profileDesc.textContent = userDataEdited.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editPopup);
    });
  
}

// Функция открытия поп-апа добавления карточки
const addCard = () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationSettings);
  openPopup(popupAddCard);
}

// Функция добавления новой карточки
const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAddCard);
  const cardObject = {};
  cardObject.name = inputPlaceNameForm.value;
  cardObject.alt = inputPlaceNameForm.value;
  cardObject.link = inputLinkImageForm.value;
  postCard(config, cardObject)
    .then((card) => {
      const currentUserId = card.owner._id;
      const newCard = createCard(
        card,
        likeCard,
        openPopupImage,
        currentUserId,
        openPopupConfirmDeleteCard
      );
      cardsContainer.prepend(newCard);
      closePopup(popupAddCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupAddCard);
    });
  
  
  
}

// Функция открытия поп-апа картинки
const openPopupImage = (evt) => {
  openPopup(popupImage);
  const card = evt.target.closest('.card');
  const cardTitle = card.querySelector('.card__title');
  if (evt.target.classList.contains('card__image')) {
    imagePopup.src = evt.target.src;
    captionImagePopup.textContent = cardTitle.textContent;
    imagePopup.alt = cardTitle.textContent;
  }
}




// Функция показа процесса загрузки данных на кнопке
const renderLoading = (isLoading, popupElement) => {
  const popupButton = popupElement.querySelector('.popup__button');
  isLoading
    ? (popupButton.textContent = 'Сохранение...')
    : (popupButton.textContent = 'Сохранить');
};

// Фукнция закрытия поп-апа кликом на крестик


// Обработчики закрытия поп-апов кликом по кнопке крестик
popupCloseButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', closePopupByButton);
});


// Обработчики закрытия поп-апов кликом по оверлею
popups.forEach(function (popup) {
  popup.addEventListener('click', closePopUpByOverlay);
});

// Обработчик submit смены аватара профиля
formAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Обработчик submit сохранения данных профиля
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// Обработчик открытия поп-апа смены автара
avatarProfile.addEventListener('click', openPopupAvatar);

// Обработчик открытия поп-апа редактирования профиля
profileEditButton.addEventListener('click', openPopupProfileEdit);

// Обработчик открытия поп-апа добавления карточки
cardAddButton.addEventListener('click', addCard);

// Обработчик submit для добавления новой карточки
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

enableValidation(validationSettings);