const AppReducer = (state, action) => {

    switch (action.type) {

        case 'REGISTER':
            return {
                ...state,
                user: { ...action.payload }
            };
        case 'LOGIN':
            return {
                ...state,
                user: { ...action.payload }
            };
        case 'LOGOUT':
            return {
                ...state,
                user: {}
            }

        default:
            return state;
    }

}

export default AppReducer;