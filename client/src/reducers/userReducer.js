const initialState = {
    username: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'CLEAR_USERNAME':
            return {
                ...state,
                username: ''
            };
        default:
            return state;
    }
};

export default userReducer;
