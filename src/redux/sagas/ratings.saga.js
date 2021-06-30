import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to the ratings router to see if a brewery is on the user's favorites
function* fetchRatingFavoriteData (action) {
    // breweryId that needs to be checked is action.payload
    const breweryId = action.payload;
    try {
        // axios request to GET favorites data from the ratings router
        const ratingAndFavorite = yield axios.get(`/api/ratings/${breweryId}`);
        console.log('got an answer', ratingAndFavorite.data);
        
        // change state in ratings reducer depending on returning data, will either be 0 or 1 element in an array
        
        // if no data came back it means user hasn't rated the target brewery or made it a favorite, 
        if (ratingAndFavorite.data.length === 0) {
            // set isFavorite to be false and rating to be 0 in ratings reducer
            yield put({ type: 'SET_RATING_FAVORITES_DATA', payload: { is_favorite: false, rating: 0 }})
        } else {
        // if data came back, send the data to the ratings reducer
            yield put({ type: 'SET_RATING_FAVORITES_DATA', payload: ratingAndFavorite.data[0]})   
        }
    } catch (error) {
        console.error('Error with checkIfFavorite in ratingsSaga')
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