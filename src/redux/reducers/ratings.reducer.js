
// reducer to hold state of ratings data and favorites data for breweries
const ratingsData = (state = {}, action) => {
    switch(action.type) {
        case 'SET_RATING_FAVORITES_DATA':
        console.log(action.payload);
        
        // set the ratings and favorites data for the brewery being looked at
            return {
                isFavorite: action.payload.is_favorite,
                rating: action.payload.rating
            }
        default:
            return state;
    }
}

export default ratingsData;