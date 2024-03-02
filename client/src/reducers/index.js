import { combineReducers } from 'redux';
import userReducer from './userReducer';
import leaderboardReducer from './leaderboardReducer';

const rootReducer = combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
});

export default rootReducer;
