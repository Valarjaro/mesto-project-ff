import './styles/index.css';

// import { initialCards } from "./scripts/cards.js";
import { showPopup, closePopup, closePopupClick} from './components/modal.js';
import { addCard, removeCard, likeCard } from './components/card.js';
import { enableValidation } from './components/validation.js';
import { getProfileContent, getCardContent, patchProfile, postNewCard} from './components/api.js';


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

//Профиль
const profileImage = page.querySelector('.profile__image');
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__description');

// 7 API Загрузка карточек с сервера
function getPageContent() {
    // Поэтому для загрузки данных пользователя и карточек необходимо воспользоваться методом Promise.all()
    Promise.all([getProfileContent(), getCardContent()])
         .then(([getProfileContentRes, getCardContentRes]) => {
             profileName.textContent = getProfileContentRes.name;
             profileJob.textContent = getProfileContentRes.about;
             profileImage.src = getProfileContentRes.avatar;
             profileImage.alt = `Это ${getProfileContentRes.name}`;
             placesList.innerHTML = '';
        
             getCardContentRes.forEach(function (item) {
                 const receivedCardContent = {
                    name: item.name,
                    alt: item.name,
                    link: item.link,
                };
                 placesList.append(addCard(receivedCardContent,removeCard, showPopupImage, likeCard));
             });
         })
         .catch(error => { console.error(error) })
}

getPageContent();

// 3. Работа модальных окон

//«Редактировать»

const profileTitleContent = page.querySelector(".profile__title");
const profileDescriptionContent = page.querySelector(".profile__description");

buttonEdit.addEventListener('click', () => {
    //При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
    enableValidation();
    nameInput.value = profileTitleContent.textContent;
    jobInput.value = profileDescriptionContent.textContent;
    showPopup(popupEdit);
})

//«+»
buttonAdd.addEventListener('click', () => {
  enableValidation();  
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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEditSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.
    
    // Получите значение полей jobInput и nameInput из свойства value ???
    // Выберите элементы, куда должны быть вставлены значения полей

    // API 5. Редактирование профиля
    patchProfile(nameInput.value, jobInput.value).then(getPageContent())
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

    postNewCard(newPlace).then(getPageContent());


    // //новая карточка попадала в начало контейнера с ними
    placesList.prepend(addCard(newPlace, removeCard, showPopupImage, likeCard));
    
    //А диалоговое окно после добавления автоматически закрывалось
    closePopup(popupNewCard);
    //и очищалась форма.
    formNewPlace.reset();
});