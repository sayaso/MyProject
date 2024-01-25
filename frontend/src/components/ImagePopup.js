import '../index.css';
import addButton from '../images/add_button.svg'


function ImagePopup({card, onClose, isOpen}) {
  function handleClick(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__img-close-button')) {
      onClose()
    }
  }

    return(
        <div className={"popup popup-image" + (isOpen ? ' popup_opened' : '')} onClick={handleClick}>
            <div className="popup-image__container">
              <button className="popup__close-button popup-image__close" type="button">
                <img src={addButton} alt="кнопка закрытия" className="popup__img-close-button hover" />
              </button>
              <img src={card.link} alt={`фотография ${card.name}`} className="popup-image__photo" />
              <p className="popup-image__name">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup
