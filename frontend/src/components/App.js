import '../index.css'
import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import ProtectedRouteElement from './ProtectedRoute'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import InfoToolPopup from './InfoToolTip'
import api from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {authorize, register, getContent} from './Auth'


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isInfoToolPopupOpen, setInfoToolPopupOpen] = useState(false);
    const [isInfoToolPopupOk, setInfoToolPopupOk] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('')

    const [currentUser,setCurrentUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
      tokenCheck();
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([User, initialCards]) => {
        console.log(localStorage.token)
        setCurrentUser(User)
        setCards(initialCards); 
      })
      .catch((err) => {console.log(err)})
    }, [email])

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  function handleInfoToolPopupClick () {
    setInfoToolPopupOpen (true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoToolPopupOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeCardsLikeStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleDeleteCard (card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter(
        (item)=> item._id !== card._id
        )
      )}
    )
    .catch( err => console.log(err))
  }

  function handleUpdateUser({name, about}) {
    api.editProfile({name, about})
    .then(({name, about}) => {
      setCurrentUser((user) => {
        return {...user, name, about}
      })
      closeAllPopups()
    })
    .catch( err => console.log(err))
  }

  function handleUpdateAvatar ({avatar}) {
    api.changeAvatar({avatar})
    .then(({avatar}) => {
      setCurrentUser((user) => {
        return {...user, avatar}
      })
      closeAllPopups()
    })
    .catch( err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    setCards([newCard, ...cards])
  }

  function handleAddCard ({name, link}) {
    api.addNewCard({name, link})
    .then((card) => {
      handleAddPlaceSubmit(card)
      closeAllPopups()
    })
    .catch( err => console.log(err))
  }

  function tokenCheck () {
    const token = localStorage.getItem('token');
    if (token) {
      getContent(token).then((res) => {
        if (res){
          setEmail(res.data.email)
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      })
      .catch((err) => console.log(err));
    }
  } 

  function handleSignUp (password, email) {
    register(password, email)
    .then(() => {
      setInfoToolPopupOk(true)
      handleInfoToolPopupClick()
      navigate('/signin', {replace: true});
    })
    .catch((e) => {
      setInfoToolPopupOk(false)
      handleInfoToolPopupClick()
    })
  }

  function handleLogin (email, password, setStatus) {
    authorize(email, password).then((data) => {
      if (data.token) {
          setStatus({email: '', password: ''});
          setEmail(email)
          setLoggedIn(true) 
          navigate('/', {replace: true});
      }
    })
    .catch(err => console.log(err));
  }

  function handleSignOut () {
    localStorage.removeItem('token');
    navigate("/signin", {replace:true})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">            
            <Routes>
              <Route path="/" element={ <ProtectedRouteElement 
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onDeleteCard={handleDeleteCard}
                cards={cards}
                email={email}
                loggedIn={loggedIn} 
                onSignOut={handleSignOut}
                headerLinkText="Выйти"
                />}
              />

              <Route path="/signup" element={ <Register headerLinkText="Вход"  headerLinkUrl="/signin" onSignUp={handleSignUp} />} />

              <Route path="/signin" element={ <Login headerLinkText="Регистрация"  headerLinkUrl="/signup"  onSignIn={handleLogin}/>} />
            </Routes>


          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>  

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>

          <PopupWithForm title="Вы уверены?" name="popup_delete" buttonText="Да">
            
          </PopupWithForm>

          <ImagePopup isOpen={isImagePopupOpen} card={selectedCard || {}} onClose={closeAllPopups}/>

          <InfoToolPopup isOpen={isInfoToolPopupOpen} onClose={closeAllPopups} ok={isInfoToolPopupOk}/>
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;