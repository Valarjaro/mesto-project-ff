// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

// принимает в аргументах данные одной карточки и функцию-колбэк для удаления
function cardAdd (cardDataSource, cardRemoveCallback) {
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

    // возвращает подготовленный к выводу элемент карточки
    return cardElement;
}

// @todo: Функция удаления карточки

function сardRemove(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((cardDataSource) => {
  placesList.append(cardAdd (cardDataSource, сardRemove));
});
