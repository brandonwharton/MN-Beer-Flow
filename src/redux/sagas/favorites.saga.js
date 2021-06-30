import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to the ratings router to see if a brewery is on the user's favorites
function* checkIfFavorite (action) {
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



// worker Saga: makes a POST request to add the current BreweryDetails target to user's favorites
function* addToFavorites (action) {
    try {
        // axios request to add a brewery to the user's favorites
        yield axios.post(`/api/ratings/favorite`, {breweryId: action.payload});
        // GET updated favorites information for the newly favorite brewery to update DOM
        yield put({ type: 'FETCH_SINGLE_FAVORITE', payload: action.payload })
    } catch (error) {
        console.error('Error with addToFavorites in favoritesSaga', error);
    }
}



function* favoritesSaga() {
    // request to see if an individual brewery on the BreweryDetails page is on the user's favorites list
    yield takeLatest('FETCH_SINGLE_FAVORITE', checkIfFavorite);
    // request from AddToFavorites to add the currently viewed BreweryDetails brewery to user's favorites
    yield takeLatest('CREATE_NEW_FAVORITE', addToFavorites);
}

export default favoritesSaga;