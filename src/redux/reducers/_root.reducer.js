import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import breweryList from './brewery.reducer';
import commentsList from './comments.reducer';
import ratingsData from './ratings.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  breweryList, // contains an array of brewery data
  commentsList, // contains an array of comments data
  ratingsData, // contains an object with ratings and favorites data
});

export default rootReducer;
