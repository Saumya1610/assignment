const initialState = {
    userStats: []
};

const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_STATS':
            return {
                ...state,
                userStats: action.payload
            };
        default:
            return state;
    }
};

export default leaderboardReducer;
