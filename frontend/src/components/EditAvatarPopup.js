import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup (props) {
    const inputRef = React.useRef();

    React.useEffect(() => {
      if(props.isOpen) {
          inputRef.current.value = ('')
      }
  }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
          avatar: inputRef.current.value
        })
    }

    return (
        <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <input ref={inputRef} id="input-avatar" type="url" name="avatar" className="form__input" placeholder="Ссылка на аватар" required/>
        <span className="input-avatar-error input-error"></span>
      </PopupWithForm>
    )
}