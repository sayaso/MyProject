import '../index.css';
import React from 'react';
import editButton from '../images/Edit_Button.svg'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
  
  return(
        <main>
            <section className="profile">
              <div className="profile__avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${currentUser.data.avatar})`}}>
                <div className="profile__avatar-change"></div>
              </div>
              <div className="profile__info">
                <h1 className="profile__name">
                  {currentUser.data.name}
                </h1>
                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                  <img src={editButton} alt="Кнопка - отредактировать имя и описание профиля" className="profile__img-edit-button hover"/>
                </button>
                <p className="profile__description">
                  {currentUser.data.about}
                </p>
              </div>
              <button type="button" className="profile__add-button hover" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
              {
                props.cards.map(item => (
                  <Card card={item} onClick={props.onCardClick} key={item._id} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                ))
              }
            </section>
        </main>
    )
}

export default Main
