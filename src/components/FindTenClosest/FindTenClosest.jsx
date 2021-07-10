// hooks/functions
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import closestGeometryDistance from '../../hooks/closestGeometryDistance';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import AverageRating from '../AverageRating/AverageRating';
import DisplayDistanceFromUser from '../DisplayDistanceFromUser/DisplayDistanceFromUser';
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
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

    let sortedArray = [];
    let slicedArray = [];

    // look at reducer that's holding user's geographical coordinates
    const userLocation = useSelector(store => store.location.userLocation);

    const allBreweries = useSelector(store => store.breweries.allBreweries);


    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_BREWERIES' });
    }, []);

    const handleClick = (id) => {
        // on click of the brewery card, send user to the details view for that brewery
        history.push(`/details/${id}`)
    }


    console.log(userLocation);
    if (allBreweries.length > 0 && userLocation.latitude) {
        sortedArray = closestGeometryDistance(allBreweries, userLocation)
        slicedArray = sortedArray.slice(0, 10);
    } else {
        console.log('no data yet');
    }


    return (
        <div className="App-main-position">
            <Typography variant="h3" component="h3" align="center">
                Closest to You:
            </Typography>
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
            <GetUserLocation />
        </div>
    )
}


export default FindTenClosest;