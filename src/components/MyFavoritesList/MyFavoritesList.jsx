// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// components
import MyFavoritesItem from '../MyFavoritesItem/MyFavoritesItem';


// Material-UI styles
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
}));

// "Home Page" component after login that shows the user their list of breweries they've marked as favorite
function MyFavoritesList() {
    // use the correct Material-UI styles
    const classes = useStyles();

    const dispatch = useDispatch();
    // access data from brewery reducer
    const favoriteBreweryList = useSelector(store => store.breweryList)

    // on page load, get user's favorites
    useEffect(() => {
        // dispatch brewery saga to GET any breweries marked as user favorites
        dispatch({ type: 'FETCH_USER_FAVORITES' });
    }, [])

    console.log(favoriteBreweryList);
    return (
        <div>
            <Typography variant="h3" component="h3">
                My Favorites
            </Typography>
            <Grid container className={classes.root} spacing={2} justify={'center'}>
                <Grid item xs={10}>
                    {favoriteBreweryList?.map(brewery => (
                        <MyFavoritesItem key={brewery.id} brewery={brewery}/>
                    ))}
                </Grid>
            </Grid>
        </div>

    )
}

export default MyFavoritesList;