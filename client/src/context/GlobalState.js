import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import setLocalStorage from '../utils/setLocalStorage';

const initialState = {
    username: localStorage.getItem('username'),
    userTransactions: JSON.parse(localStorage.getItem('userTransactions')) || []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const registerUser = async (user) => {

        try {

            const dbRegisterUserRes = await (await (fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }))).json();

            if (dbRegisterUserRes.msg) {
                throw dbRegisterUserRes;
            }

            console.log(dbRegisterUserRes);

            setLocalStorage(dbRegisterUserRes);

            dispatch({
                type: 'REGISTER',
                payload: dbRegisterUserRes.username
            });

        } catch (err) {
            console.error(err);
        }

    }

    const loginUser = async (user) => {

        try {

            const dbLoginUserRes = await (await (fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }))).json();

            if (dbLoginUserRes.msg) {
                throw dbLoginUserRes;
            }

            setLocalStorage(dbLoginUserRes);

            dispatch({
                type: 'LOGIN',
                payload: dbLoginUserRes.username
            });

        } catch (err) {
            console.error(err);
        }

    }

    const logoutUser = () => {
        localStorage.clear();

        dispatch({
            type: 'LOGOUT',
        })
    }

    const getUserTransactions = async () => {

        try {

            const userTransactions = await (await (fetch('http://localhost:5000/api/payments', {
                method: 'GET',
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }))).json();

            if (!userTransactions) {
                throw userTransactions;
            }

            localStorage.setItem('userTransactions', JSON.stringify(userTransactions));

            dispatch({
                type: 'GET_USER_TRANSACTIONS',
                payload: userTransactions
            });


        } catch (err) {
            console.error(err);
        }

    }

    return (
        <GlobalContext.Provider value={{
            state,
            dispatch,
            registerUser,
            loginUser,
            logoutUser,

            getUserTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    )

}