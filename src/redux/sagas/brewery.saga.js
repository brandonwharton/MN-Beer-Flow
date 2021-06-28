import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBreweryDetails(action) {
    console.log('Got to fetchBreweryDetails for:', action.payload);
    
}



function* brewerySaga() {
    yield takeLatest('FETCH_SINGLE_BREWERY', fetchBreweryDetails);
}

export default brewerySaga;