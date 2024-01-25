import '../index.css';
import React from 'react';
import addButton from '../images/add_button.svg'
import completedImg from '../images/completed.svg'
import errorImg from '../images/error.svg'

function InfoTooltip({isOpen, onClose, isCorrect}) {
    const completedMessage = 'Вы успешно зарегистрировались!'
    const errorMessage = 'Что-то пошло не так! Попробуйте еще раз.'

    function handleClick(evt) {
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__img-close-button')) {
          onClose()
        }
      }

    return (
        <div className={"popup" + (isOpen ? ' popup_opened' : '')} onClick={handleClick}>
            <div className="popup__container">
                <div className='popup__block infoTooltip__block'>
                    <img src={isCorrect ? completedImg : errorImg} alt={isCorrect ? 'значок правильно введенных данных' : 'значок неправильно введнных данных'} className='infoTooltip__img'/>
                    <h2 className='infoTooltip__header'>{isCorrect ? completedMessage : errorMessage}</h2>
                </div>
                <button className="popup__close-button" type="button">
                    <img src={addButton} alt="кнопка закрытия" className="popup__img-close-button hover" />
                </button>
            </div>
        </div>
    )
}

export default InfoTooltip