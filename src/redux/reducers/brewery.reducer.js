
// reducer to hold current state for brewery details
const breweryList = (state = [], action) => {
    switch(action.type) {
        case 'SET_BREWERY_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default breweryList;