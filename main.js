(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r=document.querySelector("#card-template").content;function o(e,t,n,o){var p=r.querySelector(".places__item").cloneNode(!0),c=p.querySelector(".card__image"),a=p.querySelector(".card__title");return c.src=e.link,c.alt=e.name,a.textContent=e.name,p.querySelector(".card__delete-button").addEventListener("click",(function(){t(p)})),c.addEventListener("click",n),p.querySelector(".card__like-button").addEventListener("click",o),p}function p(e){e.remove()}function c(e){e.target.classList.toggle("card__like-button_is-active")}var a=document.querySelector(".page__content"),u=a.querySelector(".content"),i=u.querySelector(".places__list"),l=u.querySelector(".profile__edit-button"),s=a.querySelector(".popup_type_edit"),d=u.querySelector(".profile__add-button"),_=a.querySelector(".popup_type_new-card"),y=a.querySelector(".popup_type_image"),v=a.querySelectorAll(".popup");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){i.append(o(e,p,k,c))}));var m=a.querySelector(".profile__title"),f=a.querySelector(".profile__description");l.addEventListener("click",(function(){L.value=m.textContent,E.value=f.textContent,e(s)})),d.addEventListener("click",(function(){e(_)}));var q=a.querySelector(".popup__image"),S=a.querySelector(".popup__caption");function k(t){q.src=t.target.src,q.alt=t.target.alt,S.textContent=t.target.alt,e(y)}v.forEach((function(e){e.addEventListener("click",(function(n){!function(e,n){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&t(n)}(n,e)}))}));var g=a.querySelector(".popup_type_edit .popup__form"),L=g.querySelector(".popup__input_type_name"),E=g.querySelector(".popup__input_type_description"),h=a.querySelector(".profile__title"),x=a.querySelector(".profile__description");g.addEventListener("submit",(function(e){e.preventDefault(),h.textContent=L.value,x.textContent=E.value,t(s)}));var b=a.querySelector(".popup_type_new-card .popup__form"),j=b.querySelector(".popup__input_type_card-name"),C=b.querySelector(".popup__input_type_url");b.addEventListener("submit",(function(e){e.preventDefault();var n={name:j.value,alt:j.value,link:C.value};i.prepend(o(n,p,k,c)),t(_),b.reset()}))})();