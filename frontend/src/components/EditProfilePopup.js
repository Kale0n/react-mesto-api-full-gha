import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function  EditProfilePopup (props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name ? currentUser.name : '');
        setDescription(currentUser.about ? currentUser.about : '');
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
    
        props.onUpdateUser({
        name,
        about: description,
        });
    } 

    function handleNameChange (e) {
        setName(e.target.value)
    }

    function handleDescriptionChange (e) {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen ={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                <input id="input-name" type="text" name="name" className="form__input" value={name} onChange={handleNameChange} minLength="2" maxLength="40" required/>
                <span className="input-name-error input-error"></span>
                <input id="input-occupation" type="text" name="about" className="form__input" value={description} onChange={handleDescriptionChange} minLength="2" maxLength="200" required/>
                <span className="input-occupation-error input-error"></span>
        </PopupWithForm> 
    )
}