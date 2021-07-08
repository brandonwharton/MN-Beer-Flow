import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to get details for user's favorite breweries
function* fetchUserFavorites() {
    try {
        const userFavorites = yield axios.get(`/api/brewery/user`);
        // send favorite breweries data to brewery reducer
        yield put({ type: 'SET_FAVORITES_DATA', payload: userFavorites.data });
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
        // replace all null values with 0
        searchedBreweries.forEach(brewery => {
            if (brewery.average_rating === null) {
                return brewery.average_rating = 0;
            }
        })
        // send filtered brewery data to brewery reducer
        yield put({ type: 'SET_BREWERY_DATA', payload: searchedBreweries });
    } catch (error) {
        console.error('Error with fetchSearchResults in brewerySaga', error)
    }
}


// worker Saga: makes a GET request for the user's favorite breweries, selects one at random, 
// and sends user to the BreweryDetails page for that brewery
function* fetchRandomFavoriteBrewery (action) {
    try {
        // GET request to get the array of user's favorites
        const userFavorites = yield axios.get(`/api/brewery/user`);
        // selects a random number between 0 and the number of elements in the userFavorites array
        const randomIndex = Math.floor(Math.random() * userFavorites.data.length);
        // uses the randomly generated number to store a random brewery from the array of favorites
        const randomFavorite = userFavorites.data[randomIndex];
        // action.payload is a callback function that takes in a brewery id and navigates to the BreweryDetails page for that id
        yield action.payload.navToRandom(randomFavorite.id);
    } catch (error) {
        console.error('Error with fetchRandomFavoriteBrewery in brewerySaga', error);
    }
}


// worker Saga: makes a GET request for every brewery in the database, selects one at random, 
// and sends user to the BreweryDetails page for that brewery
function* fetchAnyRandomBrewery (action) {
    try {
        // GET request to get the array of user's favorites
        const allBreweries = yield axios.get(`/api/brewery`);
        // selects a random number between 0 and the number of elements in the userFavorites array
        const randomIndex = Math.floor(Math.random() * allBreweries.data.length);
        // uses the randomly generated number to store a random brewery from the array of favorites
        const randomBrewery = allBreweries.data[randomIndex];
        // action.payload is a callback function that takes in a brewery id and navigates to the BreweryDetails page for that id
        yield action.payload.navToRandom(randomBrewery.id);
    } catch (error) {
        console.error('Error with fetchAnyRandomBrewery in brewerySaga', error);
    }
}


function* fetchAllBreweries () {
    try {
        const allBreweries = yield axios.get('/api/brewery');
        yield put({ type: 'SET_ALL_BREWERIES', payload: allBreweries.data})
    } catch (error) {
        console.error('Error with fetchAllBreweries in brewerySaga', error);
    }
}



function* brewerySaga () {
    // request from MyFavoritesList to get all breweries on the current user's list of favorites
    yield takeLatest('FETCH_FAVORITE_BREWERIES', fetchUserFavorites);
    // request from BreweryDetails to get a single brewery from DB
    yield takeLatest('FETCH_SINGLE_BREWERY', fetchSingleBrewery);
    // request from the SearchBar component to get search results 
    yield takeLatest('FETCH_SEARCH_RESULTS', fetchSearchResults);
    // request from the RandomBrewery component to get a random brewery from the user's favorites and navigate to that detail page
    yield takeLatest('FETCH_RANDOM_FAVORITE_BREWERY', fetchRandomFavoriteBrewery)
    // request from the RandomBrewery component to get a random brewery from among the entire database and navigate to that detail page
    yield takeLatest('FETCH_ANY_RANDOM_BREWERY', fetchAnyRandomBrewery)
    // fetch all breweries
    yield takeLatest('FETCH_ALL_BREWERIES', fetchAllBreweries);

    // request from FindFiveClosest to find the five closest breweries to the user's location
    // yield takeLatest('FETCH_FIVE_CLOSEST_BREWERIES', fetchFiveClosest);
}

export default brewerySaga;