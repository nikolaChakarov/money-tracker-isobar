const AppReducer = (state, action) => {

    switch (action.type) {

        case 'REGISTER':
            return {
                ...state,
                username: action.payload
            };
        case 'LOGIN':
            return {
                ...state,
                username: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                username: null
            };
        case 'GET_USER_TRANSACTIONS':
            return {
                ...state,
                userTransactions: [...action.payload],
                transactionsInit: true
            };
        case 'GET_USER_TRANSACTIONS#INIT':
            return {
                ...state,
                transactionsInit: false
            }

        default:
            return state;
    }

}

export default AppReducer;