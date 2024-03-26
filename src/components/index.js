import '../pages/index.css';
import { createCard, removeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { initialCards } from './cards.js';
// import { enableValidation} from './validation.js';

const cardsContainer = document.querySelector('.places__list');

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const nameInput = document.querySelector("[name= name]");

const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const editForm = editPopup.querySelector('.popup__form');
const inputNameFormProfile = editForm.querySelector('.popup__input_type_name');
const inputDescFormProfile = editForm.querySelector('.popup__input_type_description');
const inputElement = document.querySelectorAll('.popup__input');

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const inputNameNewCard = newCardForm.querySelector('.popup__input_type_card-name');
const inputUrlNewCard = newCardForm.querySelector('.popup__input_type_url');


const cardOverview = document.querySelector('.popup_type_image');
const cardOverviewImage = cardOverview.querySelector('.popup__image');
const cardOverviewDesc = cardOverview.querySelector('.popup__caption');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form_input-error_active",
};

const addCard = (cardElement) => {
  cardsContainer.appendChild(cardElement);
}

const addCardToBeginning = (cardElement) => {
  const firstChild = cardsContainer.firstChild;
  cardsContainer.insertBefore(cardElement, firstChild);
}

const listeningCardImage = (e) => {
  const image = e.target;
  cardOverviewImage.src = image.src;
  cardOverviewImage.alt = image.alt;
  cardOverviewDesc.textContent = image.alt;
  openPopup(cardOverview);
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, listeningCardImage);
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
  const newCard = createCard(cardInfo, removeCard, listeningCardImage); 
  addCardToBeginning(newCard);
  newCardForm.reset();
  closePopup(newCardPopup);
}

newCardForm.addEventListener('submit', addNewCard);

const profileInputError = (formElement, nameInput,validationConfig ,errorMessage) => {
  const profileError = formElement.querySelector(
    `.${nameInput.id}-error`
  );
  console.log(profileError)
  inputElement.classList.add(validationConfig.inputErrorClass);
  profileError.textContent = errorMessage;
  profileError.classList.add(validationConfig.errorClass);
};

const profileHideInputError = (formElement, inputElement,validationConfig) => {
  const profileError = formElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  profileError.classList.remove(validationConfig.errorClass);
  profileError.textContent = "";
}

const isValidProfile = (formElement, inputElement,validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorProfile);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  //Браузерные сообщения об ошибке
  if (!inputElement.validity.valid) {
    profileInputError(
      formElement,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else {
    profileHideInputError(formElement, inputElement,validationConfig);
  }
};

const setEventListeners = (formElementProfile) => {
  const inputList = Array.from(
    formElementProfile.querySelectorAll(".popup__input")
  );
  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", () => {
      isValidProfile(formElementProfile, popupInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement,validationConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 

export const enableValidation = (validationConfig) => {
  const formElementList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formElementList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
  
};

enableValidation(validationConfig);