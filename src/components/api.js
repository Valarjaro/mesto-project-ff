const apiConfiguration = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-36/",
  headers: {
    authorization: "a41b141a-fdbb-4ea4-af21-7e61c753a601",
    ContentType: "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
}

// Профиль
// 3. Загрузка информации о пользователе с сервера
export function getProfileContent() {
  return fetch(`${apiConfiguration.baseUrl}users/me`, {
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
  }).then(checkResponse);
}

// 5. Редактирование профиля
export function patchProfile(newProfileName, newProfileJob) {
  return fetch(`${apiConfiguration.baseUrl}users/me `, {
    method: "PATCH",
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileJob,
    }),
  }).then(checkResponse);
}

// Карточки
// 4. Загрузка карточек с сервера

export function getCardContent() {
  return fetch(`${apiConfiguration.baseUrl}cards`, {
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
  }).then(checkResponse);
}

// 6. Добавление новой карточки

export function postNewCard(newCard) {
  return fetch(`${apiConfiguration.baseUrl}cards`, {
    method: "POST",
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
    body: JSON.stringify({
      name: newCard.name,
      alt: newCard.name,
      link: newCard.link,
    }),
  }).then(checkResponse);
}

// 7. Отображение количества лайков карточки

export function putLike(cardId) {
  return fetch(`${apiConfiguration.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
  }).then(checkResponse);
}

export function deleteLike(cardId) {
  return fetch(`${apiConfiguration.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
  }).then(checkResponse);
}

// 8. Удаление карточки

export function deleteCard(cardId) {
  return fetch(`${apiConfiguration.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
  });
}

// 10 Обновление аватара пользователя

export function patchAvatar(newAvatarSrc) {
  return fetch(`${apiConfiguration.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConfiguration.headers.authorization,
      "Content-Type": apiConfiguration.headers.ContentType,
    },
    body: JSON.stringify({
      avatar: newAvatarSrc,
    }),
  }).then(checkResponse);
}
