// hooks
import { useDispatch } from 'react-redux';
// Material-UI components
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

// component to randomly select a brewery and send the user to the BreweryDetails view for it
function RandomBrewery() {
    const dispatch = useDispatch();
    const history = useHistory();

    // function to navigate user to the details page for a brewery
    const navToRandom = (id) => {
        history.push(`/details/${id}`);
    }

    // click handler to select a random brewery from the user's favorites
    const randomFromFavorites = () => {
        // dispatches to brewery saga to find a random choice from the user's favorites list 
        // passing navToRandom to allow navigation from inside a Saga
        dispatch({ type: 'FETCH_RANDOM_FAVORITE_BREWERY', payload: navToRandom });
    }

    // click handler to select a random brewery from among every brewery in database
    const anyRandomBrewery = () => {
        // dispatches to brewery saga to find a random choice from among the entire database
        // passing navToRandom to allow navigation from inside a Saga
        dispatch({ type: 'FETCH_ANY_RANDOM_BREWERY', payload: navToRandom });
    }



    return(
        <div className="App-main-position">
            <Button
                variant="contained"
                color="primary"
                onClick={randomFromFavorites}
            >
                From Favorites
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={anyRandomBrewery}
            >
                Be Brave
            </Button>
        </div>
    )
}

export default RandomBrewery;