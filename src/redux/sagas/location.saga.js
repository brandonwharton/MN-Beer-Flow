import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: sends a GET request to Google's geocoding API to get the latitude and longitude for a given address
function* fetchBreweryCoordinates (action){
    console.log('got to fetchBreweryCoordinates,', action.payload);
    
    try {
        // action.payload contains address information
        yield axios.get(`/api/google`, {
            params: {
                address: action.payload.address,
                city: action.payload.city
            }
        });
        
    } catch (error) {
        console.error('Error with fetchBreweryCoordinates in locationSaga', error);
    }
}


function* locationSaga () {
    yield takeLatest('FETCH_BREWERY_COORDINATES', fetchBreweryCoordinates);
}

export default locationSaga;