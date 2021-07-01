import { combineReducers } from 'redux';

// reducer to hold state of ratings data and favorites data for breweries
const userRatingsData = (state = {isFavorite: false, rating: 0}, action) => {
    switch(action.type) {
        case 'SET_RATING_FAVORITES_DATA':
        console.log('in ratingsData reducer:', action.payload);
        
        // set the ratings and favorites data for the brewery being looked at
            return {
                isFavorite: action.payload.is_favorite,
                rating: action.payload.rating
            }
        default:
            return state;
    }
}

const averageRatingsData = (state = { rating: 0}, action) => {
    // switch(action.type) {

    // }
    return state
}

export default combineReducers({
    userRatingsData,
    averageRatingsData,
  });

