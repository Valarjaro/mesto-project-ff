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
const popupImage = page.querySelector('.popup_type_image');

const popups = page.querySelectorAll('.popup');

// 5 спринт
// @todo: Вывести карточки на страницу

initialCards.forEach((cardDataSource) => {
  placesList.append(addCard (cardDataSource, removeCard, showPopupImage, likeCard));
});

// 3. Работа модальных окон

//«Редактировать»

const profileTitleContent = page.querySelector(".profile__title");
const profileDescriptionContent = page.querySelector(".profile__description");

buttonEdit.addEventListener('click', () => {
    //При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
    nameInput.value = profileTitleContent.textContent;
    jobInput.value = profileDescriptionContent.textContent;
    showPopup(popupEdit);
})

//«+»
buttonAdd.addEventListener('click', () => {
    showPopup(popupNewCard);
})

//при нажатии на картинку, передаем в addCard
const cardContentImage = page.querySelector('.popup__image');
const cardContentCaption = page.querySelector('.popup__caption');

function showPopupImage(evt) {

    cardContentImage.src = evt.target.src;
    cardContentImage.alt = evt.target.alt;
    cardContentCaption.textContent = evt.target.alt;

    // 8. Открытие попапа с картинкой
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
const formEdit = page.querySelector(".popup_type_edit .popup__form");

// Находим поля формы в DOM
// Получите значение полей jobInput и nameInput из свойства value
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEditSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.
    
    // Получите значение полей jobInput и nameInput из свойства value ???
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', handleFormEditSubmit);

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

// 7 спринт

// 1. Валидация формы «Редактировать профиль»

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });



  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };

  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };

  function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
  };

  function setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
  };

  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElement) => {
        setEventListener(formElement);
  });
};
  enableValidation();
 

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {return !inputElement.validity.valid;})
  };

  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
      } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
      }
  };

  // 1. Валидация формы «Редактировать профиль»