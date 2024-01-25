import '../index.css';
import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onSubmit}) {
    const [link, setLink] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
      if (currentUser.data !== undefined) {
        setLink(currentUser.data.avatar)
      }
    }, [isOpen])

    function handleChangeLink(e) {
      setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        onSubmit(link)
      }

    return(
        <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
          <label>
            <span className="popup__span"></span>
            <input type="url" name="description" id="links" placeholder="Ссылка на картинку" required value={link || ''} onChange={handleChangeLink} className="popup__input popup__input_type_description"/>
            <span className="links-error popup__span"></span>
          </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
