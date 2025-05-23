import { putLike, deleteLike, deleteCard } from '../components/api.js'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

// принимает в аргументах данные одной карточки и функцию-колбэк для удаления
export function addCard (cardDataSource, cardRemoveCallback, showPopupImage, likeCard, myId, item) {
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
    cardLikeCounter.textContent = item.likes.length;
    cardElement.id = item._id;

    let likedByMe
    item.likes.forEach((profile) => {
        likedByMe = profile._id === myId
        })
        const cardByMe = myId === item.owner._id;

    //открытие попапа с картинкой
    cardImage.addEventListener('click', showPopupImage);
    //лайк    
    cardLikeButton.addEventListener('click', (evt) => {
        likeCard(evt, item._id)});
    //проверка на карточки которым я поставил лайк    
    if (likedByMe) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }

    
    if (cardByMe) {
        cardDeleteButton.addEventListener('click', () => {
            cardRemoveCallback(cardElement, item._id);
        });
    } else {
        cardDeleteButton.classList.add('card__delete-button-hidden');
    }
    // возвращает подготовленный к выводу элемент карточки
    return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(card, cardId) {
    deleteCard(cardId)
        .then(function() {
            card.remove()
        })
        .catch(function(err) {
            console.error('Ошибка:', err);
        })
}

// 7. Лайк карточки

export function likeCard(evt, cardId) {
    const wasLiked = evt.target.classList.toggle('card__like-button_is-active');
    const apiAction = wasLiked ? putLike(cardId) : deleteLike(cardId);
    const cardItem = document.getElementById(cardId);
    const targetCardLikeCounter = cardItem.querySelector('.card__like-counter')

    apiAction.then(function(res) {
        targetCardLikeCounter.textContent = res.likes.length;
    })
    .catch(function(err) {
        console.error('Ошибка:', err);
    })
}
