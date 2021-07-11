import { combineReducers } from 'redux';

// reducer to hold state of ratings data and favorites data for breweries
// This reducer could be removed eventually if the brewery sagas and router GETS all get refactored to correctly GET ratings data with their
// requests to the DB


// reudcer to store the user's ratings of different breweries. Setting the default state below prevents errors with the Ratings component
// when navigating between views
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

// reducer to store the average rating for a brewery
const averageRatingsData = (state = { averageRating: 0}, action) => {
    switch(action.type) {
        case 'SET_NO_AVERAGE_RATING': // If no ratings data exists, rating is set to 0 to prevent null ratings
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

