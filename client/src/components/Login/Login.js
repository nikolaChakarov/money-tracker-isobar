import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import IsNotAuth from '../../middlewares/IsNotAuth';


import './Login.css';


const Login = ({ history }) => {

    const { loginUser, state } = useContext(GlobalContext);

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = userData;

    useEffect(() => {
        if (state.username) {
            history.push('/');
        }
    }, [state.username]);

    const onInputChanged = (e) => {

        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });

    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        loginUser(userData);
    }


    return (
        <section className="login-section">
            <h2>Login Form</h2>

            <form
                className="form login-form"
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

                <button type="submit" className="btn login-btn">Login</button>

                <div className="account-option">
                    <p>You don't have an account... <a href="/register">Register</a></p>
                </div>

            </form>


        </section>
    )
}

export default IsNotAuth(Login);