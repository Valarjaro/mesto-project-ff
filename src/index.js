import './styles/index.css';

// import { initialCards } from "./scripts/cards.js";
import { showPopup, closePopup, closePopupClick} from './components/modal.js';
import { addCard, removeCard, likeCard } from './components/card.js';
import { enableValidation } from './components/validation.js';
import { apiConfiguration } from './components/api.js';


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


// а от предыдущего способа отображения первоначальных карточек избавьтесь... эр ай пи
// initialCards.forEach((cardDataSource) => {
//   placesList.append(addCard (cardDataSource, removeCard, showPopupImage, likeCard));
// });

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

// 7 API

// fetch(`${apiConfiguration.baseUrl}users/me`, {
//          headers: {
//              authorization: apiConfiguration.headers.authorization,
//              'Content-Type': apiConfiguration.headers.ContentType
//          }
//      })
//     //  .then(result => result.json())
//      .then((res) => {
//         return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     console.log(data.name); // если мы попали в этот then, data — это объект
// })

const profileImage = page.querySelector('.profile__image');

function getProfileContent() {
    fetch(`${apiConfiguration.baseUrl}users/me`, {
        headers: {
            authorization: apiConfiguration.headers.authorization,
            'Content-Type': apiConfiguration.headers.ContentType
        }
    })
    .then((res) => {
        return res.json()
      })
    .then((res) => {
        profileName.textContent = res.name;
        profileJob.textContent = res.about;
        profileImage.style = `background-image: url('${res.avatar}')`
  })
};

getProfileContent();

function getCardContent() {
    fetch(`${apiConfiguration.baseUrl}cards`, {
        headers: {
            authorization: apiConfiguration.headers.authorization,
            'Content-Type': apiConfiguration.headers.ContentType
        }
    })
    .then((res) => {
        return res.json()
      })
    .then(cards => {
        console.log(cards);
        cards.forEach(card => {
            const cardElement = addCard(card,removeCard, showPopupImage, likeCard);
            placesList.append(cardElement);
        })
      })
};

getCardContent();

const newCardDescription = 'Безмятежный утёс';
const newCardSource = 'https://avatars.dzeninfra.ru/get-zen_doc/2046228/pub_5f111b5a95e2d531097b9601_5f1121dc550986574d5dd891/scale_1200'

function postNewCard(description, source){
    return fetch(`${apiConfiguration.baseUrl}cards`, {
        method: 'POST',
        headers: {
            authorization: apiConfiguration.headers.authorization,
            'Content-Type': apiConfiguration.headers.ContentType
        },
        body: JSON.stringify({
            name: description,
            link: source
        })
    }).then(res => res.json())
}

// getCardContent();

function deleteCard() {
    return fetch(`${apiConfiguration.baseUrl}/cards/67f65c6819bdb0009a2e8348`, {
        method: 'DELETE',
        headers: {
            authorization: apiConfiguration.headers.authorization,
            'Content-Type': apiConfiguration.headers.ContentType
        },
    })
}

// deleteCard();

// function editProfile() {
//     fetch(`${apiConfiguration.baseUrl}users/me `, {
//         method: 'PATCH',
//         headers: {
//             authorization: apiConfiguration.headers.authorization,
//             'Content-Type': apiConfiguration.headers.ContentType
//         },
//         body: JSON.stringify({
//             name: 'Valarjar',
//             about: 'middlender'
//         })
//     })
//     .then((res) => {
//         return res.json()
//       })
// };

// editProfile();