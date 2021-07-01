import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to get details for user's favorite breweries
function* fetchUserFavorites() {
    try {
        const userFavorites = yield axios.get(`/api/brewery/user`);
        // send favorite breweries data to brewery reducer
        yield put({ type: 'SET_BREWERY_DATA', payload: userFavorites.data });
    } catch (error) {
        console.error('Error with fetchUserFavorites in brewerySaga', error);
    }
}


// worker Saga: makes a GET request to get details for a single brewery based on provided DB id
function* fetchSingleBrewery (action) {
    // id to find is what's sent in action.payload
    const breweryId = action.payload;
    try {
        // axios request to get details about the brewery
        const breweryInfo = yield axios.get(`/api/brewery/${breweryId}`);
        // send brewery data to brewery reducer
        yield put({ type: 'SET_BREWERY_DATA', payload: breweryInfo.data });

    } catch (error) {
        console.error('Error with fetchSingleBrewery in brewerySaga', error);
    }
}

// worker Saga: makes a GET request for all breweries, then filters them using a search query before sending them to the brewery reducer
function* fetchSearchResults (action) {
    try {
        const allBreweries = yield axios.get(`/api/brewery`);
        // filter through the full result from DB, searching for name matches
        const searchedBreweries = allBreweries.data.filter(brewery => {
            // return any name matches ignoring case to the search query in action.payload
            if (brewery.name.toUpperCase().includes(action.payload.toUpperCase())) {
                return brewery;
            }
        })
        // send filtered brewery data to brewery reducer
        yield put({ type: 'SET_BREWERY_DATA', payload: searchedBreweries });
    } catch (error) {
        console.error('Error with fetchSearchResults in brewerySaga', error)
    }
}


function* brewerySaga() {
    // request from MyFavoritesList to get all breweries on the current user's list of favorites
    yield takeLatest('FETCH_FAVORITE_BREWERIES', fetchUserFavorites);
    // request from BreweryDetails to get a single brewery from DB
    yield takeLatest('FETCH_SINGLE_BREWERY', fetchSingleBrewery);
    // request from the SearchBreweries *****CHANGE THIS****** component to get a searched list of breweries
    yield takeLatest('FETCH_SEARCH_RESULTS', fetchSearchResults);
}

export default brewerySaga;