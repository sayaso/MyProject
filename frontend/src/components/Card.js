import '../index.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext)
  const isOwner = card.owner === currentUser.data._id
  const isLiked = card.likes.some(i => i === currentUser.data._id)
  const cardLikeButtonClassName = (
    `element__heart hover ${isLiked && 'element__heart_active'}`
  )
  function onCardClick() {
    onClick(card)
  }
  function handleLikeClick() {
    onCardLike(card)
    console.log(card)
  }
  function handleCardDelete() {
    onCardDelete(card)
  }

    return(
        <div className="element">
          {isOwner && <div className="element__delete hover" onClick={handleCardDelete}></div>}
          <img src={card.link} alt={card.name} className="element__photo" onClick={onCardClick}/>
          <div className='card__header'>
            <h2 className="element__name">{card.name}</h2>
            <div className={cardLikeButtonClassName} onClick={handleLikeClick}><p className="element__like-count">{card.likes.length}</p></div>
          </div>
          <div className='card__header card__header_text'>
            <p className='card__description'>{card.description}</p>
          </div>
        </div>
    )
}

export default Card
