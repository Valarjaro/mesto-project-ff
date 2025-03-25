// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

// принимает в аргументах данные одной карточки и функцию-колбэк для удаления
export function addCard (cardDataSource, cardRemoveCallback, showPopupImage) {
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

    // возвращает подготовленный к выводу элемент карточки
    return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(card) {
    card.remove();
}