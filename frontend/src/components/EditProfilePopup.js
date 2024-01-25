import '../index.css';
import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [user, setUser] = React.useState({})
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
      if (currentUser.data !== undefined) {
        setUser(currentUser.data)
      }
    }, [isOpen])
    
    function handleChangeName(e) {
      setUser({ name: e.target.value, about: user.about})
    }
    function handleChangeDescription(e) {
      setUser({ about: e.target.value, name: user.name})
    }
    function handleSubmit(e) {
      e.preventDefault()

      onUpdateUser({name: user.name, about: user.about})
    }

    return(
        <PopupWithForm title={'Редактировать профиль'} name={'profile'} isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
          <label>
            <input type="text" name="name" id="name" minLength="2" maxLength="40" placeholder="Имя профиля" required className="popup__input popup__input_type_name" value={user.name || ''} onChange={handleChangeName} />
            <span className="name-error popup__span"></span>
          </label>
          <label>
            <input type="text" name="about" id="about" minLength="2" maxLength="200" placeholder="Описание профиля" required className="popup__input popup__input_type_description" value={user.about || ''} onChange={handleChangeDescription}/>
            <span className="about-error popup__span"></span>
          </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup
