export default function InfoToolPopup (props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
             <div className="popup__signup" >
                {props.ok ? 
                    <>
                    <img className="popup__img" src={require("../images/Register_OK.png")} alt="Ok"/>
                    <h2 className="popup__heading">Вы успешно зарегестрировались!</h2>
                    </>
                    : 
                    <>
                    <img className="popup__img" src={require("../images/Register_ERROR.png")} alt="error"/>
                    <h2 className="popup__heading" >Что-то пошло не так! Попробуйте еще раз</h2>
                    </>
                }
                <button name="closeButton" type="button" className="popup__close-button" onClick={props.onClose}></button>  
            </div>
        </div>
    )
}