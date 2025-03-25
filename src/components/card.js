// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

// принимает в аргументах данные одной карточки и функцию-колбэк для удаления
export function addCard (cardDataSource, cardRemoveCallback, showPopupImage, likeCard) {
    // клонировать шаблон,
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    // установить значения вложенных элементов,
    cardImage.src = cardDataSource.link;  
    cardImage.alt = cardDataSource.name;

    cardTitle.textContent = cardDataSource.name;

    // добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
        cardRemoveCallback(cardElement);
    });

    //открытие попапа с картинкой
    cardImage.addEventListener('click', showPopupImage);

    //лайк
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", likeCard);

    // возвращает подготовленный к выводу элемент карточки
    return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(card) {
    card.remove();
}

// 7. Лайк карточки

export function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.remove('card__like-button_is-active');
    } else {
        evt.target.classList.add('card__like-button_is-active');
    } 
}