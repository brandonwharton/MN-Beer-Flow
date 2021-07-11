// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import './RandomBrewery.css';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';


// component to randomly select a brewery and send the user to the BreweryDetails view for it
function RandomBrewery() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [distanceLimit, setDistanceLimit] = useState('none');
    const [noResults, setNoResults] = useState(false);

    const userLocation = useSelector(store => store.location.userLocation);

    // function to navigate user to the details page for a brewery
    const navToRandom = (id) => {
        history.push(`/details/${id}`);
    }


    // click handler to select a random brewery from among every brewery in database
    const anyRandomBrewery = () => {
        // dispatches to brewery saga to find a random choice from among the entire database
        // passing navToRandom to allow navigation from inside a Saga
        dispatch({ type: 'FETCH_ANY_RANDOM_BREWERY', payload: {
            navToRandom: navToRandom,
            distanceLimit: distanceLimit,
            userLocation: userLocation
        }});
        // set state of noResults to true to render a message if the view doesn't change
        setNoResults(true);
    }


    // click handler to select a random brewery from the user's favorites
    const randomFromFavorites = () => {
        // dispatches to brewery saga to find a random choice from the user's favorites list 
        // passing navToRandom to allow navigation from inside a Saga
        dispatch({ type: 'FETCH_RANDOM_FAVORITE_BREWERY', payload: {
            navToRandom: navToRandom,
            distanceLimit: distanceLimit,
            userLocation: userLocation
        }});
        // set state of noResults to true to render a message if the view doesn't change
        setNoResults(true);
    }



    const handleChange = (event) => {
        setDistanceLimit(event.target.value);
    }


    console.log(distanceLimit);
    return (
        <div className="App-main-position">
            <Typography variant="body1" component ="p" align="center" gutterBottom>
                Optional: select a maximum distance away in miles
            </Typography>
            <div className="random-view-spacing select-label">
                <InputLabel id="distance-limit-label" >Distance Limit</InputLabel>
                <Select
                    labelId="distance-limit-label"
                    id="distance-limit"
                    value={distanceLimit}
                    onChange={handleChange}
                >
                    <MenuItem value={'none'}>None</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={25}>Twenty Five</MenuItem>
                    <MenuItem value={50}>Fifty</MenuItem>
                </Select>
            </div>
            {/* Conditional rendering if a user selected a distance that was too close and no results were found */}
            {noResults && 
            <Typography variant="h5" component="h5" align="center" gutterBottom>
                No results exist within chosen distance limit. Please widen your radius.
            </Typography>
            }


            <Typography variant="h5" component="h5" align="center">
                Pick a random brewery from anywhere in MN:
            </Typography>
            <div className="center-this random-view-spacing">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={anyRandomBrewery}
                >
                    Be Brave
                </Button>
            </div>
            <Typography variant="h5" component="h5" align="center">
                Or from just among your favorites:
            </Typography>
            <div className="center-this random-view-spacing">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={randomFromFavorites}
                >
                    From Favorites
                </Button>
            </div>


            <GetUserLocation />
        </div>
    )
}

export default RandomBrewery;