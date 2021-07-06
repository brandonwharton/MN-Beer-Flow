import { combineReducers } from 'redux';

// reducer to hold state of ratings data and favorites data for breweries
const userRatingsData = (state = {isFavorite: false, rating: 0}, action) => {
    switch(action.type) {
        case 'SET_RATING_FAVORITES_DATA':
        // set the ratings and favorites data for the brewery being looked at
            return {
                isFavorite: action.payload.is_favorite,
                rating: action.payload.rating
            }
        default:
            return state;
    }
}

const averageRatingsData = (state = { averageRating: 0}, action) => {

    
    switch(action.type) {
        case 'SET_NO_AVERAGE_RATING':
            return { averageRating: 0 }
        case 'SET_AVERAGE_RATING':
            // average rating comes back from SQL as a string
            return { averageRating: Number(action.payload.average_rating) }
        default:
            return state;
    }
}

export default combineReducers({
    userRatingsData,
    averageRatingsData,
  });

