// hooks
import { useDispatch } from 'react-redux';
// Material-UI components
import Button from '@material-ui/core/Button';

// component to randomly select a brewery and send the user to the BreweryDetails view for it
function RandomBrewery() {
    const dispatch = useDispatch();

    // click handler to select a random brewery from the user's favorites
    const randomFromFavorites = () => {
        // dispatches to brewery saga to find a random from the user's favorites list
        dispatch({ type: 'FETCH_RANDOM_FAVORITE_BREWERY' })
    }

    // click handler to select a random brewery from among every brewery in database
    const anyRandomBrewery = () => {
        console.log('clicked');
    }



    return(
        <div>
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