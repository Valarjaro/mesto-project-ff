import { putLike, deleteLike, deleteCard } from '../components/api.js'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

// принимает в аргументах данные одной карточки и функцию-колбэк для удаления
export function addCard (cardDataSource, cardRemoveCallback, showPopupImage, likeCard, cardId, likeCount, likedByMe, cardByMe) {
    // клонировать шаблон,
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardLikeCounter = cardElement.querySelector(".card__like-counter");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    // установить значения вложенных элементов,
    cardImage.src = cardDataSource.link;  
    cardImage.alt = cardDataSource.name;
    cardTitle.textContent = cardDataSource.name;
    cardLikeCounter.textContent = likeCount;
    cardElement.id = cardId;

    // // добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
    // cardDeleteButton.addEventListener('click', function() {
    //     cardRemoveCallback(cardElement);
    // });
    //открытие попапа с картинкой
    cardImage.addEventListener('click', showPopupImage);
    //лайк    
    cardLikeButton.addEventListener('click', (evt) => {
        likeCard(evt, cardId)});
    //проверка на карточки которым я поставил лайк    
    if (likedByMe) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }

    
    if (cardByMe) {
        cardDeleteButton.addEventListener('click', () => {
            removeCard(cardElement, cardId);
        });
    } else {
        cardDeleteButton.classList.add('card__delete-button-hidden');
    }


    if (cardByMe) {
        cardDeleteButton.addEventListener('click', () => {
            removeCard(cardElement, cardId);
         });
        }
    // возвращает подготовленный к выводу элемент карточки
    return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(card, cardId) {
    deleteCard(cardId);
    card.remove();
}

// 7. Лайк карточки

export function likeCard(evt, cardId) {
    const wasLiked = evt.target.classList.toggle('card__like-button_is-active');
    const apiAction = wasLiked ? putLike(cardId) : deleteLike(cardId);
    const cardItem = document.getElementById(cardId);
    const targetCardLikeCounter = cardItem.querySelector('.card__like-counter')

    apiAction.then(function(res) {
        
        targetCardLikeCounter.textContent = res.likes.length;
    });
}
