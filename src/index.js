import './styles/index.css';

import { initialCards } from "./scripts/cards.js";
import { showPopup, closePopup, closePopupClick} from './components/modal.js';
import { addCard, removeCard, likeCard } from './components/card.js'


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
  placesList.append(addCard (cardDataSource, removeCard, showPopupImage, likeCard));
});

// 3. Работа модальных окон

//«Редактировать»
buttonEdit.addEventListener('click', () => {
    //При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
    nameInput.value = page.querySelector(".profile__title").textContent;
    jobInput.value = page.querySelector(".profile__description").textContent;
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
    // const cardContentImage = page.querySelector('.popup__image');
    // const cardContentCaption = page.querySelector('.popup__caption');
    // cardContentImage.src = evt.target.src;
    // cardContentImage.alt = evt.target.alt;
    // cardContentCaption.textContent = evt.target.alt;

    // 8. Открытие попапа с картинкой
    page.querySelector('.popup__image').setAttribute("src", evt.target.src);
    page.querySelector('.popup__image').setAttribute("alt", evt.target.alt);
    page.querySelector('.popup__caption').textContent = evt.target.alt;
    showPopup(popupImage);
}

//закрытие попапа кликом
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        closePopupClick(evt, popup);
    })
})

// 4 Редактирование имени и информации о себе

// Находим форму в DOM
const formElement = page.querySelector(".popup_type_edit .popup__form");

// Находим поля формы в DOM
// Получите значение полей jobInput и nameInput из свойства value
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.

    
    // Получите значение полей jobInput и nameInput из свойства value ???
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = page.querySelector('.profile__title');
    let profileJob = page.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileName.value = nameInput.textContent;
    profileJob.value = jobInput.textContent;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// 6. Добавление карточки

// Находим форму в DOM
const formNewPlace = page.querySelector(".popup_type_new-card .popup__form");

// Находим поля формы в DOM
const placeName = formNewPlace.querySelector(".popup__input_type_card-name");
const placeImageUrl = formNewPlace.querySelector(".popup__input_type_url");

formNewPlace.addEventListener("submit", function(evt){
    evt.preventDefault();

    const newPlace = {
        name: placeName.value,
        alt: placeName.value,
        link: placeImageUrl.value,
    };

    //новая карточка попадала в начало контейнера с ними
    placesList.prepend(addCard(newPlace, removeCard, showPopupImage, likeCard));
    
    //А диалоговое окно после добавления автоматически закрывалось
    closePopup(popupNewCard);
    //и очищалась форма.
    formNewPlace.reset();
});