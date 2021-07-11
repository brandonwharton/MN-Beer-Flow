import { combineReducers } from 'redux';
// reducer to hold location information for user and breweries
// currently set up using combineReducers to make additional reducers here in the future for other location data

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