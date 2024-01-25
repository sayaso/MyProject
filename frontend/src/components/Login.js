import React from "react";
import '../index.css';

function Login({onSubmit}) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
    })



    function handleChange(e) {
        const {name, value} = e.target

        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(formValue)
    }



    return(
        <section className="sign-in">
            <h2 className="sign-in__header">Вход</h2>
            <form className="sign-in__form" name='sign-in' onSubmit={handleSubmit}>
                <input className="sign-in__input" type="email" name='email' id='email' placeholder="Email" required value={formValue.email || ''} onChange={handleChange} lang='en'></input>
                <input className="sign-in__input" type="password" name='password' id='password' placeholder="Пароль" required value={formValue.password || ''} onChange={handleChange}></input>
                <button type='submit' className="sign-in__submit-button">Войти</button>
            </form>
        </section>
    )
}

export default Login
