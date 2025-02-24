// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

cardElement.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
cardElement.querySelector('.card__title').textContent = 'Архыз';

placesList.append(cardElement);
// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
