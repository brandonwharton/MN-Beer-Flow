import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: makes a GET request to the ratings router to get any ratings and favorites data for a brewery and a user
function* fetchRatingFavoriteData (action) {
    // breweryId that needs to be checked is action.payload
    const breweryId = action.payload;
    try {
        // axios request to GET favorites data from the ratings router
        const ratingAndFavorite = yield axios.get(`/api/ratings/${breweryId}`);   
        // change state in ratings reducer depending on returned data, will either be 0 or 1 element in an array
        
        // if no data came back it means the current user hasn't rated the target brewery or made it a favorite, 
        if (ratingAndFavorite.data.length === 0) {
            // set isFavorite to be false and rating to be 0 in ratings reducer
            yield put({ type: 'SET_RATING_FAVORITES_DATA', payload: { is_favorite: false, rating: 0 }})
        } else {
        // if data came back, send it to the ratings reducer
            yield put({ type: 'SET_RATING_FAVORITES_DATA', payload: ratingAndFavorite.data[0]})   
        }
    } catch (error) {
        console.error('Error with fetchRatingFavoriteData in ratingsSaga')
    }
}


// worker Saga: makes a GET request to the ratings router to get all the ratings for a brewery by all users in order
// to calculate an average rating
function* fetchAverageRating (action) {
        // breweryId that needs to be checked is action.payload
        const breweryId = action.payload;
        try {
            // axios request to GET favorites data from the ratings router
            const averageRatings = yield axios.get(`/api/ratings/average/${breweryId}`);
            // change state in ratings reducer depending on returned data, will either be 0 or 1 element in an array
            
            // if no data came back it means no user has rated the target brewery or made it a favorite, 
            if (averageRatings.data.length === 0) {
                // dispatch that sets the average rating for a brewery to 0
                yield put({ type: 'SET_NO_AVERAGE_RATING' })
            } else {
            // if data came back, send it to the ratings reducer
                yield put({ type: 'SET_AVERAGE_RATING', payload: averageRatings.data[0] });
            }
        } catch (error) {
            console.error('Error with fetchAverageRating in ratingsSaga')
        }
    
}


// worker Saga: makes a POST request to UPSERT a user's new rating for a brewery
function* setUserRating (action) {
    // action.payload contains the id to be changed and the new rating
    try {
        // axios request to POST ratings data
        yield axios.post(`/api/ratings`, action.payload);
        // update DOM now that the user has changed a rating depending on the origin of the update request
        // origin is a string that was passed as props to the MyRating component depending on where MyRating was mounted
        if (action.payload.origin === 'breweryDetails') {
            // GET fresh data for the breweryDetails page to keep the user rating and average ratings current as ratings get adjusted
            yield put({ type:'FETCH_SINGLE_RATING_FAVORITE', payload: action.payload.breweryId });
            yield put({ type: 'FETCH_AVERAGE_RATING', payload: action.payload.breweryId });
        } else if (action.payload.origin === 'myFavorites') {
            // GET data for user's favorites if they changed a rating from the MyFavorites view
            yield put ({ type: 'FETCH_FAVORITE_BREWERIES' });
        }
    } catch (error) {
        console.error('Error with setUserRating in ratingsSaga')
    }
}


// watcher Saga: looks for dispatches to get or adjust values for the Ratings components
function* ratingsSaga() {
    // request from BreweryDetails to get the favorites and ratings data for the current user for a single brewery
    yield takeLatest('FETCH_SINGLE_RATING_FAVORITE', fetchRatingFavoriteData)
    // request to get the average rating for a brewery
    yield takeLatest('FETCH_AVERAGE_RATING', fetchAverageRating);
    // request to create or update a user rating
    yield takeLatest('SET_RATING_VALUE', setUserRating);
}

export default ratingsSaga;