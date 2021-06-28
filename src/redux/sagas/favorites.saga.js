import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a POST request to add the current BreweryDetails target to user's favorites
function* addToFavorites (action) {
    console.log('in addToFavorites', action.payload);
    try {
        // axios request to add a brewery to the user's favorites
        yield axios.post(`/api/favorites`, {breweryId: action.payload});
        // update comments reducer with new data for the brewery that was just added to
        // yield put( {type: 'FETCH_BREWERY_COMMENTS', payload: action.payload.breweryId })
    } catch (error) {
        console.error('Error with addToFavorites in favoritesSaga', error);
    }
}



function* favoritesSaga() {
    // request from AddToFavorites to add the currently viewed BreweryDetails brewery to user's favorites
    yield takeLatest('CREATE_NEW_FAVORITE', addToFavorites);
}

export default favoritesSaga;