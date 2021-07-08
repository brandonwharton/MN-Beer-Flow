// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// components
import AddToFavorites from '../AddToFavorites/AddToFavorites';
import MyRatings from '../MyRatings/MyRatings';
import AverageRating from '../AverageRating/AverageRating';
import AddComment from '../AddComment/AddComment';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
        margin: '12px 0'
    },
}));





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

    // on navigation to specific details page, fetch details for specified brewery
    useEffect(()=> {
        dispatch({ type: 'FETCH_SINGLE_BREWERY', payload: id });
        dispatch({ type: 'FETCH_BREWERY_COMMENTS', payload: id });
        // dispatch to ratings Saga to get ratings data and favorites data for the current user
        dispatch({ type: 'FETCH_SINGLE_RATING_FAVORITE', payload: id });
        dispatch({ type: 'FETCH_AVERAGE_RATING', payload: id });
    }, [id]);
 

    return (
        <div className="App-main-position">
            <Typography variant="h3" component="h3" align="center">
                {brewery?.name}
            </Typography>
        
            {/* conditionally render either a message saying a brewery is on user's favorites or an add to favorites button */}
            <div>
                {ratingsData.userRatingsData.isFavorite ? 
                    <Typography variant="h5" component="h5" className="container">
                        One of your Favorites
                    </Typography> 
                    :
                    <AddToFavorites breweryId={id} />
                }
            </div>
            {/* Image and details */}
            <img src={brewery?.image_url} alt={brewery?.name} />
            <div className="image-margin">
                <Typography variant="h5" component="h5">
                    {brewery?.city}
                </Typography>
            </div>
            {/* Ratings */}
            <MyRatings breweryId={id} origin={'breweryDetails'} rating={ratingsData.userRatingsData.rating} />
            <AverageRating averageRating={ratingsData.averageRatingsData.averageRating} />
            {/* Comment form and list of comments */}
            <AddComment breweryId={id} />
            <Grid container className={classes.root} spacing={2} justify={'center'}>
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