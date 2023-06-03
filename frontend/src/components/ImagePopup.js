function ImagePopup (props) {
    return (
        <div className={`popup popup_zoom ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="zoom">
                <img src={props.card.link} alt={props.card.name} className="zoom__photo"/>
                <figcaption className="zoom__caption">{props.card.name}</figcaption>
                <button name="closeButton" type="button" className="popup__close-button" onClick={props.onClose}></button>
            </figure>
        </div>
    )
}

export default ImagePopup