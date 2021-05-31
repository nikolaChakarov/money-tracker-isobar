import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import './Register.css';

const Register = ({ history }) => {

    const { registerUser } = useContext(GlobalContext);

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        password2: ''
    });

    const { username, password, password2 } = userData;

    const onInputChanged = (e) => {

        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });

    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (username === '') {
            throw 'Please, enter your username';
        }

        registerUser(userData);

    }


    return (
        <section className="register-section">
            <h2>Register Form</h2>

            <form
                className="form register-form"
                onSubmit={onFormSubmit}
            >
                <div className="form-element">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={onInputChanged}
                        value={username}
                    />
                </div>

                <div className="form-element">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={onInputChanged}
                        value={password}
                    />
                </div>

                <div className="form-element">
                    <label htmlFor="password2">Repeat Password</label>
                    <input
                        type="text"
                        name="password2"
                        id="password2"
                        onChange={onInputChanged}
                        value={password2}
                    />
                </div>

                <button type="submit" className="btn register-btn">Register</button>

            </form>
        </section>
    )
}

export default Register;