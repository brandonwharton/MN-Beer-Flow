
// reducer to hold current state for comments
const commentsList = (state = [], action) => {
    switch(action.type) {
        case 'SET_COMMENTS_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default commentsList;