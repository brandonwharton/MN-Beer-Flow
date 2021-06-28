import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
        console.error('Error with fetchBreweryDetails in brewerySaga', error);
    }
    
}



function* brewerySaga() {
    yield takeLatest('FETCH_SINGLE_BREWERY', fetchSingleBrewery);
}

export default brewerySaga;