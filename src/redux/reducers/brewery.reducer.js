import { combineReducers } from 'redux';

// reducer to hold current state for brewery details
const breweryList = (state = [], action) => {
    switch(action.type) {
        case 'SET_BREWERY_DATA':
            return action.payload;
        default:
            return state;
    }
}

// reducer to hold favorite breweries
const favoritesList = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAVORITES_DATA':
            return action.payload;
        default:
            return state;
    }
}

// reducer to hold a list of all breweries for when logic needs to be done on the client side before displaying filtered results
const allBreweries = (state = [], action) => {
    switch(action.type) {
        case 'SET_ALL_BREWERIES':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    breweryList,
    favoritesList,
    allBreweries,
});
