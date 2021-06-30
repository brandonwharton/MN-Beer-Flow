import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to the ratings router to see if a brewery is on the user's favorites
function* fetchRatingFavoriteData (action) {
    // breweryId that needs to be checked is action.payload
    const breweryId = action.payload;
    try {
        // axios request to GET favorites data from the ratings router
        const checkFavorite = yield axios.get(`/api/ratings/${breweryId}`);
        
        // change state in ratings reducer depending on returning data, will either be 0 or 1 element in an array
        
        // if no data came back it means user hasn't rated the target brewery or made it a favorite, 
        if (checkFavorite.data.length === 0) {
            // set isFavorite to be false in ratings reducer
            yield put({ type: 'SET_FAVORITES_DATA', payload: false })
        } else {
        // if data came back, set isFavorite to true or false based on data provided in is_favorite column from the database
            yield put({ type: 'SET_FAVORITES_DATA', payload: checkFavorite.data[0].is_favorite})   
        }
    } catch (error) {
        console.error('Error with checkIfFavorite in favoritesSaga')
    }
    
}


// worker Saga: makes a POST request to UPSERT a user's new rating for a brewery
function* setUserRating (action) {
    // action.payload contains the id to be changed and the new rating
    try {
        // axios request to POST ratings data
        yield axios.post(`/api/ratings`, action.payload);

    } catch (error) {
        console.error('Error with setUserRating in ratingsSaga')
    }

}

function* ratingsSaga() {
    yield takeLatest('FETCH_SINGLE_RATING_FAVORITE', fetchRatingFavoriteData)
    // request to create or update a user rating
    yield takeLatest('SET_RATING_VALUE', setUserRating);
}

export default ratingsSaga;