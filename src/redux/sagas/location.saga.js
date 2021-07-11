import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: sends a GET request to Google's geocoding API to get the latitude and longitude for a given address
// this was used to get coordinates into DB, this function isn't currently being used but is here for future Admin mode to 
// get map coordinates if an Admin adds a new brewery to the DB
function* fetchBreweryCoordinates (action){
    try {
        // action.payload contains address information
        const locationResult = yield axios.get(`/api/google`, {
            params: {
                address: action.payload.breweryAddress,
                city: action.payload.breweryCity
            }
        });
        // then send request to update DB with requested latitude and longitude data, data being sent is an object with keys of lat and lng
        yield axios.put(`/api/brewery/coordinates/${action.payload.breweryId}`, locationResult.data.results[0].geometry.location)
    } catch (error) {
        console.error('Error with fetchBreweryCoordinates in locationSaga', error);
    }
}


// watcher Saga: looks for dispatches involving location coordinates
function* locationSaga () {
    yield takeLatest('FETCH_BREWERY_COORDINATES', fetchBreweryCoordinates);
}

export default locationSaga;