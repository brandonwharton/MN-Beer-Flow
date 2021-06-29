import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: makes a GET request to get all the comments created by the current user
function* fetchUserComments () {
    try {
        // axios request to the comments router for user's comments
        const userComments = yield axios.get(`/api/comments`);
        console.log(userComments.data);
        

    } catch (error) {
        console.error('Error with fetchUserComments in commentsSaga', error)
    }
}



// worker Saga: makes a GET request to get the comments for a single brewery based on provided DB id
function* fetchBreweryComments (action) {
    // id to find is what's sent in action.payload
    const breweryId = action.payload;
    try {
        // axios request to get comments for the brewery
        const comments = yield axios.get(`/api/comments/${breweryId}`);
        // send comments data to comments reducer
        yield put({ type: 'SET_COMMENTS_DATA', payload: comments.data });
    } catch (error) {
        console.error('Error with fetchBreweryComments in commentsSaga', error);
    }
}

// worker Saga: makes a POST request to add a new comment to the comments table
function* postNewComment (action) {
    try {
        // axios request to add a new comment, action.payload contains the comment body and the id of the 
        // brewery being commented on
        yield axios.post(`/api/comments`, action.payload);
        // update comments reducer with new data for the brewery that was just added to
        yield put( {type: 'FETCH_BREWERY_COMMENTS', payload: action.payload.breweryId })
    } catch (error) {
        console.error('Error with postNewComment in commentsSaga', error);
    }
}


function* commentsSaga() {
    // request from MyCommentsList to get all data for comments created by the current user
    yield takeLatest('FETCH_USER_COMMENTS', fetchUserComments);
    // request from BreweryDetails to get the comments data for a single brewery from DB
    yield takeLatest('FETCH_BREWERY_COMMENTS', fetchBreweryComments);
    // request to add a new comment to a brewery
    yield takeLatest('CREATE_NEW_COMMENT', postNewComment);
}

export default commentsSaga;