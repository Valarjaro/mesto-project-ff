import './styles/index.css';

import { initialCards } from "./scripts/cards.js";
import { showPopup, closePopup, closePopupClick} from './components/modal.js';
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

const popups = page.querySelectorAll('.popup');

// 5 спринт
// @todo: Вывести карточки на страницу

initialCards.forEach((cardDataSource) => {
  placesList.append(addCard (cardDataSource, removeCard, showPopupImage));
});

// 3. Работа модальных окон

//«Редактировать»
buttonEdit.addEventListener('click', () => {
    showPopup(popupEdit);
})

//«+»
buttonAdd.addEventListener('click', () => {
    showPopup(popupNewCard);
})

//поиск карточки c картинкой на которую кликнули
cardImage.forEach((item) => {
    item.addEventListener('click', (evt) => {
        showPopup(popupImage);
    })
})

//при нажатии на картинку, передаем в addCard
function showPopupImage(evt) {
    showPopup(popupImage);
}

//закрытие попапа кликом
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        closePopupClick(evt, popup);
    })
})