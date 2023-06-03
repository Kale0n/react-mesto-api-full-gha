import Header from "./Header.js"
import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register (props) {
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

        const { password, email } = formValue;
        props.onSignUp(password, email)

      }

    return (
        <>
            <Header linkText={props.headerLinkText}  linkUrl={props.headerLinkUrl}  />
            <div className="sign">
                <h2 className="sign__heading">Регистрация</h2>
                <form className="sign__form" onSubmit={handleSubmit}>
                    <fieldset className="form__input-container form__input-container_sign-form ">
                        <input name="email" type="email" className="form__input form__input_sign-form" value={formValue.email} onChange={handleChange} placeholder="email" required></input>
                        <input name="password" type="password" className="form__input form__input_sign-form" value={formValue.password} onChange={handleChange} placeholder="password" minLength={6} maxLength={30} required></input>
                    </fieldset>
                    <button className="form__save-button form__save-button_sign-form" onSubmit={handleSubmit} >Зарегестрироваться</button>
                </form>
                <p className="sign__register-question">Уже зарегестрированы?<Link className="sign__link" to="/signin">Войти</Link></p>
        </div>
        </>
    )
}