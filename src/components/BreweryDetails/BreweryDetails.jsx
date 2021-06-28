// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// components
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
        backgroundColor: '#999',
    },
}));





// BreweryDetails is a details page that fetches data for a single brewery from the DB and renders it
function BreweryDetails() {
    // use the correct Material-UI styles
    const classes = useStyles();
    // dispatch hook for sagas
    const dispatch = useDispatch();
    // hold database ID for page that was navigated to
    const { id } = useParams();
    // access data from brewery reducer, data comes in as an array with one element object
    const brewery = useSelector(store => store.breweryList[0]);
    // access data from comments reducer, data comes in as an array of comment objects
    const comments = useSelector(store => store.commentsList);

    // on navigation to specific details page, fetch details for specified brewery
    useEffect(()=> {
        dispatch({ type: 'FETCH_SINGLE_BREWERY', payload: id });
        dispatch({ type: 'FETCH_BREWERY_COMMENTS', payload: id })
    }, []);


    return (
        <div>
            <Typography variant="h3" component="h3">
                {brewery?.name}
            </Typography>
            {/* Add to favorites/ on your favorites rendering goes here */}
            <img src={brewery?.image_url} alt={brewery?.name} />
            {/* Ratings details go here */}
            <Typography variant="h5" component="h5">
                {brewery?.city}
            </Typography>
            <AddComment breweryId={id} />

            <Grid container className={classes.root} spacing={2} justify={'center'}>
                <Grid item xs={10}>
                    {comments?.map(comment => (
                        <Card className={classes.card}>
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
            {/* Back button goes here */}
        </div>
    )
}

export default BreweryDetails;