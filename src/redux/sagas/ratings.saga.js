import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a POST request to UPSERT a user's new rating for a brewery
function* setUserRating (action) {
    // action.payload contains the id to be changed and the new rating
    const id = action.payload.id
    const rating = action.payload.newRating;
    console.log('in setUserRating', id, rating);
    

}

function* ratingsSaga() {
    // request to create or update a user rating
    yield takeLatest('SET_RATING_VALUE', setUserRating);
}

export default ratingsSaga;