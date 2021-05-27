import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    user: {},
    payments: [],
    errors: []
}

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

            if (!dbRegisterUserRes) {
                throw dbRegisterUserRes;
            }

            console.log(dbRegisterUserRes);

            dispatch({
                type: 'REGISTER',
                payload: dbRegisterUserRes
            });

        } catch (err) {
            console.error(err);
        }

    }

    return (
        <GlobalContext.Provider value={{
            user: state.user,
            registerUser
        }}>
            {children}
        </GlobalContext.Provider>
    )

}