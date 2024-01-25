import '../index.css';
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip';
import Auth from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false)
  const [isCorrectRegister, setIsCorrectRegister] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const navigate = useNavigate()
  const auth = new Auth({
    url: 'http://localhost:3001/',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    }
  })
  const api = new Api({
    url: 'http://localhost:3001/',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    }
  })

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoPopupOpen(false)
    setIsImagePopupOpen(false)
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser.data._id)

    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => {console.log(err)})
    }
    else {
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => {console.log(err)})
    }
  }
  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then((res) => {
      setCards(cards => cards.filter((c) => c._id !== card._id));
    })
    .catch(err => {console.log(err)})
  }
  function handleUpdateUser(data) {
    api.changeeProfileInfo(data)
    .then((userInfo) => {
      setCurrentUser(userInfo)
      closeAllPopups()
    })
    .catch(err => {console.log(err)})
  }
  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
    .then((userInfo) => {
      setCurrentUser(userInfo)
      closeAllPopups()
    })
    .catch(err => {console.log(err)})
  }
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups()
    })
    .catch(err => {console.log(err)})
  }
  function handleSubmitRegister(data) {
    auth.signUp(data)
    .then(() => {
      setIsInfoPopupOpen(true)
      setIsCorrectRegister(true)
    })
    .catch((err) => {
      setIsInfoPopupOpen(true)
      setIsCorrectRegister(false)
      console.log(err)
    })
  }
  function handleSubmitLogin(data) {
    auth.signIn(data)
    .then((token) => {
      localStorage.setItem('jwt', token.token)
      setIsLoggedIn(true)
      setEmail(data.email)
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards(),
      ])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards.data);
          navigate('/', {replace: true})
        })
        .catch(err => console.log(err))
    })
    .catch((err) => {
      setIsInfoPopupOpen(true)
      console.log(err)
    })
  }
  function handleExitAccount() {
    localStorage.removeItem('jwt')
  }



  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      auth.checkJWT(localStorage.getItem('jwt'))
      .then((data) => {
        setIsLoggedIn(true)
        navigate('/', {replace: true})
        setEmail(data.data.email)
        setCurrentUser(data)
        api.getInitialCards()
        .then((cardsArr) => {
          setCards(cardsArr.data);
        })
        .catch(err => {console.log(err)})
      })
      .catch(err => {console.log(err)})
    }
  }, [])
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onClick={handleExitAccount}/>

      <Routes>

        <Route path='/' element={<ProtectedRouteElement
          element={Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick} 
              onCardLike={handleCardLike} 
              cards={cards} 
              onCardDelete={handleCardDelete}
              isLoggedIn={isLoggedIn} 
              />}/>

        <Route path='/sign-up' element={<Register onSubmit={handleSubmitRegister}/>} />

        <Route path='/sign-in' element={<Login onSubmit={handleSubmitLogin}/>} />

        <Route path='*' element={isLoggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />} />

      </Routes>
      <Footer />
      
      <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} isCorrect={isCorrectRegister}/>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

      <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={false} onClose={closeAllPopups} buttonText={'Да'} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar}/>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
