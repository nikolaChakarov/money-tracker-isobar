import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';


const Navigation = () => {

    const { state } = useContext(GlobalContext);

    useEffect(() => {

    }, [state.username]);

    return (
        <nav>
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
            <li>Welcome {username}</li>
            <li><Link to="/transactions">Trasactions</Link></li>
            <li><Link to="/logout">Logout</Link></li>
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