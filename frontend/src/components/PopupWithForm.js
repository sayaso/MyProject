import '../index.css';
import addButton from '../images/add_button.svg'


function PopupWithForm({title, name, children, isOpen, onClose, buttonText, onSubmit}) {
  function handleClick(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__img-close-button')) {
      onClose()
    }
  }

  function handleSubmit(e) {
    onSubmit(e)
  }

  return(
    <div className={`popup popup-${name}` + (isOpen ? " popup_opened" : '')} onClick={handleClick}>
        <div className="popup__container">
          <div className="popup__block">
            <h2 className="popup__name">
              {title}
            </h2>
            <form className="popup__form" name={name} onSubmit={handleSubmit}>
              {children}
              <button type="submit" className="popup__save-button">{buttonText}</button>
            </form>
          </div>
          <button className="popup__close-button" type="button">
            <img src={addButton} alt="кнопка закрытия" className="popup__img-close-button hover"/>
          </button>
        </div>
    </div>
  )
}

export default PopupWithForm
