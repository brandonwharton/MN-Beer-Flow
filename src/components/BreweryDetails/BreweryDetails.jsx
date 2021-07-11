// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// components
import AddToFavorites from '../AddToFavorites/AddToFavorites';
import DisplayDistanceFromUser from '../DisplayDistanceFromUser/DisplayDistanceFromUser';
import MyRatings from '../MyRatings/MyRatings';
import AverageRating from '../AverageRating/AverageRating';
import AddComment from '../AddComment/AddComment';
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import breweryCardTheme from '../../material-ui-themes/brewery.card.theme';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


// Material-UI styles
const useStyles = breweryCardTheme;


// BreweryDetails is a details page that fetches data for a single brewery from the DB and renders it
function BreweryDetails() {
    // use the correct Material-UI styles
    const classes = useStyles();
    const dispatch = useDispatch();

    // hold database ID for page that was navigated to
    const { id } = useParams();
    // access data from brewery reducer, data comes in as an array with one element object
    const brewery = useSelector(store => store.breweries.breweryList[0]);
    // access data from comments reducer, data comes in as an array of comment objects
    const comments = useSelector(store => store.commentsList);
    // access data from ratings reducer
    const ratingsData = useSelector(store => store.ratingsData);
    // access user location data
    const userLocation = useSelector(store => store.location.userLocation);


    // on navigation to specific details page, fetch details for specified brewery
    useEffect(()=> {
        dispatch({ type: 'FETCH_SINGLE_BREWERY', payload: id });  // GET brewery data 
        dispatch({ type: 'FETCH_BREWERY_COMMENTS', payload: id });  // GET brewery comments
        // below dispatches could be removed at some point if "FETCH_SINGLE_BREWERY" above gets reworked to grab correct ratings data along with 
        // curent payload
        dispatch({ type: 'FETCH_SINGLE_RATING_FAVORITE', payload: id });  // GET user's rating of the brewery
        dispatch({ type: 'FETCH_AVERAGE_RATING', payload: id });  // GET average rating for the brewery 
    }, [id]);


    // conditional rendering function to display distance between user and the brewery being viewed
    const displayDistanceAway = () => {
        // if the userLocation router had data in it, display the DistanceFromUser component
        if (userLocation.latitude) {
            return (
            <span>- <DisplayDistanceFromUser brewery={brewery} /> miles away</span>
            )
        } else {
            return <></>  // display nothing if userLocation isn't being updated quickly
        }
    }

 
    return (
        <div className="App-main-position">
            <GetUserLocation /> {/* No render, GetUserLocation just runs saves the user's coordinates in the location reducer*/}

            <Typography variant="h3" component="h3" align="center" gutterBottom>
                {brewery?.name}
            </Typography>
        
            {/* conditionally render either a message saying a brewery is on user's favorites or a clickable add to favorites button */}
            <div className="image-margin">
                {ratingsData.userRatingsData.isFavorite ? 
                    <Typography variant="h5" component="h5">
                        One of your Favorites
                    </Typography> 
                    :
                    <AddToFavorites breweryId={id} />
                }
            </div>

            {/* Brewery image and details */}
            <img src={brewery?.image_url} alt={brewery?.name} />
            <div className="image-margin">
                <Typography variant="h6" component="h6" gutterBottom>
                    {brewery?.city} { userLocation.latitude && displayDistanceAway() }
                </Typography>
            </div>

            {/* Ratings */}
            <MyRatings breweryId={id} origin={'breweryDetails'} rating={ratingsData.userRatingsData.rating} />
            <AverageRating averageRating={ratingsData.averageRatingsData.averageRating} />

            {/* Comment form and list of comments */}
            <AddComment breweryId={id} />
            <Grid container spacing={2} justify={'center'}>
                <Grid item xs={10}>
                    {comments?.map(comment => (
                        <Card key={comment.id} className={classes.card}>
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    {comment.username} wrote:
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {comment.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
            
        </div>
    )
}

export default BreweryDetails;