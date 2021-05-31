import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

import './Navigation.css';


const Navigation = () => {

    const { state } = useContext(GlobalContext);

    useEffect(() => {

    }, [state.username]);

    return (
        <nav className="main-navigation">
            <p className="logo">LoGo</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                {state.username ? <UserIsLoggedIn username={state.username} /> : <UserNotLoggedIn />}
            </ul>
        </nav>
    )
}

const UserIsLoggedIn = ({ username }) => {
    return (
        <>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li className="user-name-li">Welcome <span>{username}</span></li>
        </>
    )
}

const UserNotLoggedIn = () => {
    return (
        <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    )
}

export default Navigation;