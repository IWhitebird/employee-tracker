import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import teamReducer from './slices/teamSlice';

const rootReducer = combineReducers({
    user: userReducer,
    team: teamReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;