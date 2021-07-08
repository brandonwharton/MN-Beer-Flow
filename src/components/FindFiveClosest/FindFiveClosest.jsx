// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import closestGeometryDistance from '../../hooks/closestGeometryDistance';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import AverageRating from '../AverageRating/AverageRating';
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'

// Material-UI styles
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    control: {
        padding: theme.spacing(2),
    },
    card: {
        backgroundColor: '#cbcbc9',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
}));


// component that finds the five closest breweries to the user's current location and displays them
function FindFiveClosest() {
    // use the correct Material-UI styles
    const classes = useStyles();

    const dispatch = useDispatch();

    let sortedArray = [];
    let slicedArray = [];
    let sliceValue = 5;

    // look at reducer that's holding user's geographical coordinates
    const userLocation = useSelector(store => store.location.userLocation);

    const allBreweries = useSelector(store => store.breweries.allBreweries);
    const breweryList = useSelector(store => store.breweries.breweryList);

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_BREWERIES' });
    }, []);



    console.log(userLocation);
    if (allBreweries.length > 0 && userLocation.latitude) {
        sortedArray = closestGeometryDistance(allBreweries, userLocation)
        slicedArray = sortedArray.slice(0, sliceValue);
    } else {
        console.log('no data yet');
    }


    return (
        <div className="App-main-position">
            <Typography variant="h3" component="h3" align="center">
                Closest to You:
            </Typography>
            <Grid container className={classes.root} spacing={2} justify={'center'}>
                <Grid item xs={10}>
                    {slicedArray.length > 0 &&
                    <div>
                        {slicedArray.map(brewery => (
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
                                            {brewery.city}
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


export default FindFiveClosest;