import Header from "./Header.js"
import React, {useState} from 'react';

export default function Login (props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
        })

        const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formValue.email || !formValue.password){
            return;
        }
        props.onSignIn(formValue.email, formValue.password, setFormValue)
    }


    return (
        <>
            <Header linkText={props.headerLinkText}  linkUrl={props.headerLinkUrl} />
            <div className="sign">
                <h2 className="sign__heading">Вход</h2>
                <form className="sign__form" onSubmit={handleSubmit}>
                    <fieldset className="form__input-container form__input-container_sign-form ">
                        <input name="email" type="email" className="form__input form__input_sign-form" value={formValue.email} onChange={handleChange} placeholder="email" required></input>
                        <input name="password" type="password" className="form__input form__input_sign-form" value={formValue.password} onChange={handleChange} placeholder="password" minLength={6} maxLength={35} required></input>
                    </fieldset>
                    <button className="form__save-button form__save-button_sign-form" onSubmit={handleSubmit}>Войти</button>
                </form>
            </div>
        </>
    )
}