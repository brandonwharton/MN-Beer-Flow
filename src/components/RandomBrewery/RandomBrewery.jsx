// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';
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

    // click handler to select a random brewery from the user's favorites
    const randomFromFavorites = () => {
        // dispatches to brewery saga to find a random choice from the user's favorites list 
        // passing navToRandom to allow navigation from inside a Saga
        dispatch({ type: 'FETCH_RANDOM_FAVORITE_BREWERY', payload: {
            navToRandom: navToRandom,
            distanceLimit: distanceLimit,
            userLocation: userLocation
        }});

        
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
    }

    const handleChange = (event) => {
        setDistanceLimit(event.target.value);
    }


    console.log(distanceLimit);
    return (
        <div className="App-main-position">
            <Typography variant="h5" component="h5" align="center">
                Pick a random brewery from anywhere in MN:
            </Typography>
            <div className="form-button">
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
            <div className="form-button">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={randomFromFavorites}
                >
                    From Favorites
                </Button>
            </div>
            <Typography variant="h5" component ="h5" align="center">
                Optional: select a maximum distance away in miles
            </Typography>
            <InputLabel id="distance-limit-label">Distance Limit</InputLabel>
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
            <GetUserLocation />
        </div>
    )
}

export default RandomBrewery;