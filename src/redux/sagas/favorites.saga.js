import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: makes a POST request to add the current BreweryDetails target to user's favorites
function* addToFavorites (action) {
    try {
        // axios request to add a brewery to the user's favorites
        yield axios.post(`/api/ratings/favorite`, {breweryId: action.payload});
        // GET updated favorites information for the newly favorite brewery to update DOM
        yield put({ type: 'FETCH_SINGLE_RATING_FAVORITE', payload: action.payload })
    } catch (error) {
        console.error('Error with addToFavorites in favoritesSaga', error);
    }
}



function* favoritesSaga() {
    // request from AddToFavorites to add the currently viewed BreweryDetails brewery to user's favorites
    yield takeLatest('CREATE_NEW_FAVORITE', addToFavorites);
}

export default favoritesSaga;