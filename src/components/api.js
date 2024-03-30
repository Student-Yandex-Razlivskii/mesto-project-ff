const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '24f734c3-5206-48c8-9936-ff614b2fea21',
    'Content-Type': 'application/json',
  }
}

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Функция получения данных пользователя с сервера
const getUserProfile = (config) => {
  return fetch(`${config.baseUrl + '/users/me'}`, {
    headers: config.headers,
  }).then(checkResponse)
  
};

// Функция получения карточек с сервера
const getCards = (config) => {
  return fetch(`${config.baseUrl + '/cards'}`, {
    headers: config.headers,
  }).then(checkResponse)
};

// Функция отправки измененных данных профиля пользователя на сервер
const patchEditedUserProfile = (config, nameValue, descriptionValue) => {
  return fetch(`${config.baseUrl + '/users/me'}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: descriptionValue,
    }),
  }).then((userDataEdited) =>
    userDataEdited.ok
      ? userDataEdited.json()
      : Promise.reject(`Ошибка: ${userDataEdited.status}`)
  );
};

// Функция добавления карточки на сервер
const postCard = (config, cardObject) => {
  return fetch(`${config.baseUrl + '/cards'}`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardObject.name,
      alt: cardObject.name,
      link: cardObject.link,
    }),
  }).then(checkResponse)
};

// Функция удаления карточки с сервера
const deleteCardFromServer = (config, cardId) => {
  return fetch(`${config.baseUrl + '/cards/' + cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if(!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
};

// Функция постановки лайка на сервере
const putLikeCard = (config, cardId) => {
  return fetch(`${config.baseUrl + '/cards/likes/' + cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse)
};

// Функция снятия лайка на сервере
const deleteLikeCard = (config, cardId) => {
  return fetch(`${config.baseUrl + '/cards/likes/' + cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse)
};

// Функция смены аватара на сервере
const patchAvatar = (config, avatarLink) => {
  return fetch(`${config.baseUrl + '/users/me/avatar'}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse)
};

export {
  config,
  getUserProfile,
  getCards,
  patchEditedUserProfile,
  postCard,
  deleteCardFromServer,
  putLikeCard,
  deleteLikeCard,
  patchAvatar,
};