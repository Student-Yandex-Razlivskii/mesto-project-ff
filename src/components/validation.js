// const inputElement = document.querySelectorAll('.popup__input');

// const profileInputError = (formElement, nameInput,validationConfig ,errorMessage) => {
//   const profileError = formElement.querySelector(
//     `.${nameInput.id}-error`
//   );
//   console.log(profileError)
//   inputElement.classList.add(validationConfig.inputErrorClass);
//   profileError.textContent = errorMessage;
//   profileError.classList.add(validationConfig.errorClass);
// };

// const profileHideInputError = (formElement, inputElement,validationConfig) => {
//   const profileError = formElement.querySelector(
//     `.${inputElement.id}-error`
//   );
//   inputElement.classList.remove(validationConfig.inputErrorClass);
//   profileError.classList.remove(validationConfig.errorClass);
//   profileError.textContent = "";
// }

// const isValidProfile = (formElement, inputElement,validationConfig) => {
//   if (inputElement.validity.patternMismatch) {
//     // встроенный метод setCustomValidity принимает на вход строку
//     // и заменяет ею стандартное сообщение об ошибке
//     inputElement.setCustomValidity(inputElement.dataset.errorProfile);
//   } else {
//     // если передать пустую строку, то будут доступны
//     // стандартные браузерные сообщения
//     inputElement.setCustomValidity("");
//   }
//   //Браузерные сообщения об ошибке
//   if (!inputElement.validity.valid) {
//     profileInputError(
//       formElement,
//       inputElement,
//       validationConfig,
//       inputElement.validationMessage
//     );
//   } else {
//     profileHideInputError(formElement, inputElement,validationConfig);
//   }
// };

// const setEventListeners = (formElementProfile) => {
//   const inputList = Array.from(
//     formElementProfile.querySelectorAll(".popup__input")
//   );
//   inputList.forEach((popupInput) => {
//     popupInput.addEventListener("input", () => {
//       isValidProfile(formElementProfile, popupInput);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//         // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true
//     return !inputElement.validity.valid;
//   })
// }; 

// const toggleButtonState = (inputList, buttonElement,validationConfig) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//         buttonElement.disabled = true;
//     buttonElement.classList.add(validationConfig.inactiveButtonClass);
//   } else {
//         // иначе сделай кнопку активной
//         buttonElement.disabled = false;
//     buttonElement.classList.remove(validationConfig.inactiveButtonClass);
//   }
// }; 

// export const enableValidation = (validationConfig) => {
//   const formElementList = Array.from(
//     document.querySelectorAll(validationConfig.formSelector)
//   );

//   formElementList.forEach((formElement) => {
//     setEventListeners(formElement, validationConfig);
//   });
  
// };