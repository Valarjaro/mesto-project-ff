// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function cardAdd (cardTitleSource, cardImageSource) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.setAttribute('src', cardImageSource);  
    cardImage.setAttribute('alt', cardTitleSource);

    cardTitle.textContent = cardTitleSource;

    return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function(data) {
    placesList.append(cardAdd(data.name, data.link));
});
