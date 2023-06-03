import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup (props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        if(props.isOpen) {
            setName('');
            setLink('')
        }
    }, [props.isOpen])

    function handleNameChange (e) {
        setName(e.target.value)
    }

    function handleLinkChange (e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();    
        props.onAddCard({
        name,
        link,
        });
    } 

    return (
        <PopupWithForm title="Новое место" name="add" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input value={name} onChange={handleNameChange} id="input-newPlace" type="text" name="name" className="form__input" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="input-newPlace-error  input-error"></span>
            <input value={link} onChange={handleLinkChange} id="input-link" type="url" name="link" className="form__input" placeholder="Ссылка на картинку" required/>
            <span className="input-link-error input-error"></span>
          </PopupWithForm>
    )
}