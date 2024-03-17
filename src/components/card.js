const cardTemplate = document.getElementById('card-template');

export function createCard(cardData, onDeleteCallBack, imageHandler, likeHandler) {
  const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardPic = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;

  cardPic.src = cardData.link;
  cardPic.alt = cardData.name;
  cardPic.addEventListener('click', imageHandler);

  deleteButton.addEventListener('click', () => {
  onDeleteCallBack(cardElement);
  });

  likeButton.addEventListener('click', handleLike);

  return cardElement;
}

export const cardRemove = (cardElement) => {
  cardElement.remove();
}

const handleLike = (e) => {
  e.target.classList.toggle('card__like-button_is-active')
}