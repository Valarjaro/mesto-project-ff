import './styles/index.css';

// import { initialCards } from "./scripts/cards.js";
import { showPopup, closePopup, closePopupClick} from './components/modal.js';
import { addCard, removeCard, likeCard } from './components/card.js';
import { enableValidation } from './components/validation.js';
import { getProfileContent, getCardContent, patchProfile, postNewCard, patchAvatar } from './components/api.js';


// @todo: DOM узлы
const page = document.querySelector('.page__content');
const content = page.querySelector('.content');
const placesList = content.querySelector('.places__list');


const popups = page.querySelectorAll('.popup');
//четыре модальных окна
//«Редактировать»
const buttonEdit = content.querySelector('.profile__edit-button');
const popupEdit = page.querySelector('.popup_type_edit');
//«+»
const buttonAdd = content.querySelector('.profile__add-button');
const popupNewCard = page.querySelector('.popup_type_new-card')
//при нажатии на картинку (любую)
const popupImage = page.querySelector('.popup_type_image');
//новый аватар
const avatarEdit =content.querySelector('.profile__image-wrapper');
const popupNewAvatar = page.querySelector('.popup_type_new-avatar');


//Профиль
const profileImage = page.querySelector('.profile__image');
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__description');

// 7 API Загрузка карточек с сервера
function getPageContent() {
    // Поэтому для загрузки данных пользователя и карточек необходимо воспользоваться методом Promise.all()
    Promise.all([getProfileContent(), getCardContent()])
         .then(([profileContentRes, cardContentRes]) => {
             profileName.textContent = profileContentRes.name;
             profileJob.textContent = profileContentRes.about;
             profileImage.src = profileContentRes.avatar;
             profileImage.alt = `Это ${profileContentRes.name}`;
             placesList.innerHTML = ''; 

             cardContentRes.forEach(function (item) {
                // let likedByMe
                // item.likes.forEach((profile) => {
                //     likedByMe = profile._id === profileContentRes._id
                // })  
                // const cardByMe = profileContentRes._id === item.owner._id;
                const receivedCardContent = {
                    name: item.name,
                    alt: item.name,
                    link: item.link,
                };
                 placesList.append(addCard(receivedCardContent, removeCard, showPopupImage, likeCard, profileContentRes._id, item));
             });
         })
         .catch(error => { console.error(error) })
}

getPageContent();

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

enableValidation(validationConfig); 

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

//открытие попапа редактирования аватара
avatarEdit.addEventListener('click', () => {
    showPopup(popupNewAvatar);
  })

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

formEdit.addEventListener('submit', function(evt){
    evt.preventDefault();

    const submitButton = formEdit.querySelector('.popup__button');
    const initialButtonText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    // API 5. Редактирование профиля
    patchProfile(nameInput.value, jobInput.value)
        .then((profileData) => {
        profileName.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        }) 
        .then(function() {
            closePopup(popupEdit);
            formEdit.reset();
        })
        .catch(function(err) {
            console.error('Ошибка:', err);
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = initialButtonText;
        });
});

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

    const submitButton = formNewPlace.querySelector('.popup__button');
    const initialButtonText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    postNewCard(newPlace)
        .then((cardData) => {
            // Добавляем новую карточку в начало списка
            placesList.prepend(addCard(newPlace, removeCard, showPopupImage, likeCard, cardData.owner._id, cardData));
            closePopup(popupNewCard);
            formNewPlace.reset();
        })
        .catch(function(err) {
            console.error('Ошибка:', err);
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = initialButtonText;
        });
});

// 10 Редактирование аватара
const formNewAvatar = page.querySelector(".popup_type_new-avatar .popup__form");
const newAvatarSrc = formNewAvatar.querySelector(".popup__input_type_url");

formNewAvatar.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const submitButton = formNewAvatar.querySelector('.popup__button');
    const initialButtonText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    patchAvatar(newAvatarSrc.value)
        .then(function(res) {
            profileImage.src = res.avatar;
            closePopup(popupNewAvatar);
            formNewAvatar.reset();
        })
        .catch(function(err) {
            console.error('Ошибка:', err);
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = initialButtonText;
        });
});