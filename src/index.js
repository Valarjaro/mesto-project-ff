import './styles/index.css';

import { initialCards } from "./scripts/cards.js";
import { showPopup, closePopup } from './components/modal.js';
import { addCard,removeCard } from './components/card.js'


// @todo: DOM узлы
const page = document.querySelector('.page__content');
const content = page.querySelector('.content');

const placesList = content.querySelector('.places__list');

//три модальных окна
//«Редактировать»
const buttonEdit = content.querySelector('.profile__edit-button');
const popupEdit = page.querySelector('.popup_type_edit');
//«+»
const buttonAdd = content.querySelector('.profile__add-button');
const popupNewCard = page.querySelector('.popup_type_new-card')
//при нажатии на картинку (любую)
const cardImage = content.querySelectorAll('.card__image');
const popupImage = page.querySelector('.popup_type_image');

// 5 спринт
// @todo: Вывести карточки на страницу

initialCards.forEach((cardDataSource) => {
  placesList.append(addCard (cardDataSource, removeCard));
});

// 3. Работа модальных окон

buttonEdit.addEventListener('click', () => {
    showPopup(popupEdit);
})
buttonAdd.addEventListener('click', () => {
    showPopup(popupNewCard);
})