import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to get the comments for a single brewery based on provided DB id
function* fetchBreweryComments (action) {
    // id to find is what's sent in action.payload
    const breweryId = action.payload;
    console.log('Got to fetchBreweryComments', breweryId);
    
    try {
        // axios request to get comments for the brewery
        // const comments = yield axios.get(`/api/brewery/${breweryId}`);
        // send brewery data to brewery reducer
        // yield put({ type: 'SET_BREWERY_DATA', payload: breweryInfo.data });

    } catch (error) {
        console.error('Error with fetchBreweryComments in brewerySaga', error);
    }
}


function* commentsSaga() {
    // request from BreweryDetails to get the comments for a single brewery from DB
    yield takeLatest('FETCH_BREWERY_COMMENTS', fetchBreweryComments);
}

export default commentsSaga;