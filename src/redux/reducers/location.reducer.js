import { combineReducers } from 'redux';
// reducer to hold location information for user and breweries

const userLocation = (state = {latitude: 0, longitude: 0}, action) => {
    switch(action.type) {
        case 'SET_USER_COORDINATES':
            return action.payload;
        default:
            return state;
    }
}

// send back all location reducers
export default combineReducers({
    userLocation,
});