import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Logout = ({ history }) => {

    const { logoutUser } = useContext(GlobalContext);

    useEffect(() => {
        logoutUser();

        history.push('/login');
    }, []);


    return null;
}

export default Logout;