import {useContext} from "react"
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card ({onCardClick, onCardLike, onDeleteCard, card}) {
    const user = useContext(CurrentUserContext)
    const isOwn = card.owner._id === user._id;
    const isLiked = card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked && 'element__like-button_active'}`)

    function handleClick() {
        onCardClick(card);
    }
    
    function handleDeleteClick() {
        onDeleteCard(card)
    }

    function handlelikeClick() {
        onCardLike(card)
    }

    return (
        <div className="element">
            <button name='popupButton' type="button" className="element__photo-button" onClick={handleClick}>
                <img className="element__photo" src={card.link} alt={card.name}/>
            </button>
            {isOwn && <button type="button" className="element__delete-button" onClick={handleDeleteClick}></button>}
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handlelikeClick}></button>
                    <div className="element__counter">{card.likes.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Card