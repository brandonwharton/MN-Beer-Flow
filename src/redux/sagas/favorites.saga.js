import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to the ratings router to see if a brewery is on the user's favorites
function* checkIfFavorite (action) {
    // breweryId that needs to be checked is action.payload
    const breweryId = action.payload;
    try {
        // axios request to GET favorites data from the ratings router
        const checkFavorite = yield axios.get(`/api/ratings/${breweryId}`);
        
    } catch (error) {
        console.error('Error with checkIfFavorite in ratingsSaga')
    }
    
}



// worker Saga: makes a POST request to add the current BreweryDetails target to user's favorites
function* addToFavorites (action) {
    try {
        // axios request to add a brewery to the user's favorites
        yield axios.post(`/api/ratings`, {breweryId: action.payload});
        // TO DO: Update favorites on DOM
    } catch (error) {
        console.error('Error with addToFavorites in ratingsSaga', error);
    }
}



function* favoritesSaga() {
    // request to see if an individual brewery on the BreweryDetails page is on the user's favorites list
    yield takeLatest('FETCH_SINGLE_FAVORITE', checkIfFavorite);
    // request from AddToFavorites to add the currently viewed BreweryDetails brewery to user's favorites
    yield takeLatest('CREATE_NEW_FAVORITE', addToFavorites);
}

export default favoritesSaga;