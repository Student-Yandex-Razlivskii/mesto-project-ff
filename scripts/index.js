const card = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');



function getCard (item, deleteCard){
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  })
  
  return cardElement;
}

function addCard(cardData) {
  cardList.append(getCard(cardData, deleteCard))
  
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((function(element) {
  addCard(element);
}))

