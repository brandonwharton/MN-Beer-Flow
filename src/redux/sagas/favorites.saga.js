import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a POST request to add the current BreweryDetails target to user's favorites
function* addToFavorites (action) {
    console.log('in addToFavorites', action.payload);
    try {
        // axios request to add a brewery to the user's favorites
        yield axios.post(`/api/favorites`, {breweryId: action.payload});
        // TO DO: Update favorites on DOM
    } catch (error) {
        console.error('Error with addToFavorites in favoritesSaga', error);
    }
}



function* favoritesSaga() {
    // request from AddToFavorites to add the currently viewed BreweryDetails brewery to user's favorites
    yield takeLatest('CREATE_NEW_FAVORITE', addToFavorites);
}

export default favoritesSaga;