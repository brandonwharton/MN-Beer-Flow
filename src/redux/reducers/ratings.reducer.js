
// reducer to hold state of ratings data and favorites data for breweries
const ratingsData = (state = {}, action) => {
    switch(action.type) {
        case 'SET_FAVORITES_DATA':
        // add or change favorites data only, leave any ratings the same
            return {
                ...state,
                isFavorite: action.payload
            }
        default:
            return state;
    }
}

export default ratingsData;