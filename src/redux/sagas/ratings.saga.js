import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
    // request to create or update a user rating
    yield takeLatest('SET_RATING_VALUE', setUserRating);
}

export default ratingsSaga;