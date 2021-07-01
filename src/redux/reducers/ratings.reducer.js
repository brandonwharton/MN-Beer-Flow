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
    console.log('got to averageRatingsData', action.payload);
    
    switch(action.type) {
        case 'SET_NO_AVERAGE_RATING':
            return { averageRating: 0 }
        case 'SET_AVERAGE_RATING':
            const allRatings = action.payload.all_ratings
            // set rating to 0 if the only rating is a 0
            if (allRatings[0] === 0) {
                return { averageRating: 0 };
            } else {
                // calculate average rating for whatever length all_ratings array provided
                const ratingSum = allRatings.reduce( (accumulator, currentValue) => (accumulator + currentValue))
                const averageRating = ratingSum / allRatings.length
                // set average rating with calculated value
                return { averageRating: averageRating }
            }
        default:
            return state;
    }
}

export default combineReducers({
    userRatingsData,
    averageRatingsData,
  });

