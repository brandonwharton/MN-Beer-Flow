// hooks
import { useDispatch } from 'react-redux';
// Material-UI components
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';


// component for an AddToFavorites button on the BreweryDetails view that adds the current brewery to user's 
// favorites list
function AddToFavorites({breweryId, origin}) {
    const dispatch = useDispatch();
    const history = useHistory();

    // click handler for Add to Favorites button
    const handleClick = () => {
        // send a dispatch to add brewery to the user's favorites
        dispatch({ type: 'CREATE_NEW_FAVORITE', payload: breweryId });
        // if the button was clicked from a SearchBreweryResult card, send user to BreweryDetails for that brewery
        if (origin === 'searchResults') {
            history.push(`/details/${breweryId}`)
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Add to Favorites
            </Button>
        </>

    )
} 

export default AddToFavorites;