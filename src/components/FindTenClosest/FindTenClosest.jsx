// hooks/functions
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import closestGeometryDistance from '../../hooks/closestGeometryDistance';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import AverageRating from '../AverageRating/AverageRating';
import DisplayDistanceFromUser from '../DisplayDistanceFromUser/DisplayDistanceFromUser';
// Material-UI components
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import breweryCardTheme from '../../material-ui-themes/brewery.card.theme';


// Material-UI styles
const useStyles = breweryCardTheme;


// component that finds the ten closest breweries to the user's current location and displays them
function FindTenClosest() {
    // use the correct Material-UI styles
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    // variable arrays to hold brewery data after running methods on them, keeping it local like this prevented infinite re-renders
    let sortedArray = [];
    let slicedArray = [];

    // look at reducers that are holding user's geographical location coordinates as well as the full list of all brewery data
    const userLocation = useSelector(store => store.location.userLocation);
    const allBreweries = useSelector(store => store.breweries.allBreweries);


    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_BREWERIES' });
    }, []);

    // click handler for the brewery cards that are rendered in components
    const handleClick = (id) => {
        // on click of the brewery card, send user to the details view for that brewery
        history.push(`/details/${id}`)
    }

    // make sure that the allBreweries reducer and userLocation reducer have data in them
    if (allBreweries.length > 0 && userLocation.latitude) {
        // sort the list of breweries by closest distance using Google's Spherical Geometry library
        sortedArray = closestGeometryDistance(allBreweries, userLocation);
        // save the first ten elements of the array which are the ten closest breweries to the user in terms of a straight line distance
        slicedArray = sortedArray.slice(0, 10);
    } 


    return (
        <div className="App-main-position">
            <GetUserLocation /> {/* No render, GetUserLocation just runs saves the user's coordinates in the location reducer*/}
            <Typography variant="h3" component="h3" align="center">
                Closest to You:
            </Typography>
            {/* Display cards with brewery details and average ratings for the ten closest breweries to the user's current location */}
            <Grid container className={classes.root} spacing={2} justify={'center'}>
                <Grid item xs={10} lg={4}>
                    {slicedArray.length > 0 &&
                    <div>
                        {slicedArray.map( (brewery, index) => (
                            <div key={brewery.id}>
                                <Card className={classes.card} onClick={() => handleClick(brewery.id)}>
                                    <CardHeader
                                        title={brewery.name}
                                    >
                                    </CardHeader>
                                    <CardMedia
                                        className={classes.media}
                                        image={brewery.image_url}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="h6">
                                            {brewery.city} - <DisplayDistanceFromUser brewery={brewery}/> miles away
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <AverageRating averageRating={brewery.average_rating} />
                            </div>
                        ))}
                    </div>
                    }
                </Grid>
            </Grid>
        </div>
    )
}


export default FindTenClosest;