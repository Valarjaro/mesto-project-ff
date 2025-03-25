export function showPopup(popupType) {
    popupType.classList.add('popup_is-opened');
    //обработчик события должен добавляться при открытии окна
    document.addEventListener('keydown', closePopupKeydown);
}

export function closePopup(popupType) {
    popupType.classList.remove('popup_is-opened');
    //и удаляться после закрытия.
    document.removeEventListener('keydown', closePopupKeydown);
}

//Закрытие попапа нажатием на Esc
export function closePopupKeydown(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

//а закрываются — при клике по крестику в правом верхнем углу + кликом на оверлей
export function closePopupClick(evt, popupType){
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')){
        closePopup(popupType);
    }
}