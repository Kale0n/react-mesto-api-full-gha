import {useContext} from "react"
import Card from '../components/Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Header from "./Header.js"
import Footer from "./Footer.js"

function Main (props) {
    const user = useContext(CurrentUserContext)

    return (
    <>
        <Header linkText={props.headerLinkText} onClick={props.onSignOut} email={props.email} />
        <div className="Main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" alt="Фото пользователя" src={user.avatar}/>
                    <button name='popupButton' type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{user.name}</h1>
                        <button name='popupButton' type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__occupation">{user.about}</p>
                </div>
                <button name='popupButton' type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                { props.cards.map((card) => <Card onCardClick={props.onCardClick} onCardLike={props.onCardLike} onDeleteCard={props.onDeleteCard} card={card} key={card._id}/>)}
            </section>
        </div> 
        <Footer />
    </>  
    );
  }
  
export default Main;