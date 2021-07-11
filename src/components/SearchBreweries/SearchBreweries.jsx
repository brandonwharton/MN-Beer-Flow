// hooks
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// components
import SearchBar from '../SearchBar/SearchBar';
import SearchBreweryResult from '../SearchBreweryResult/SearchBreweryResult';
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import './SearchBreweries.css';
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Material-UI styles
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
}));


// component that populates a search bar to search for breweries throughout the entire database and render the results
function SearchBreweries() {
    // use the correct Material-UI styles
    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();
    // search results are stored in the brewery reducer
    const searchedList = useSelector(store => store.breweries.breweryList);
    // using params to track searches after a user has made one while still staying on this base component
    const { query } = useParams();

    // once a search has been made, query exists as params. Use the string given in query to fetch results
    useEffect(() => {
        if (query) {
            dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: query })
        }
    }, [query])

    // click handler for the Find 10 Closest button
    const seeWhatsClose = () => {
        history.push('/closest');
    }

    // click handler for the search clear button
    const handleClear = () => {
        history.push('/search');
    }

    // conditional rendering logic for searches that don't return any results
    const showNoResults = () => {
        // if a query exists but there's nothing in the brewery reducer, render the no results message
        if (query && searchedList.length === 0) {
            return <Typography variant="h3" component = "h3">
                        No Results Found
                   </Typography>
        }
    }


    return (
        <div className="App-main-position">
            <GetUserLocation /> {/* No render, GetUserLocation just runs saves the user's coordinates in the location reducer*/}
            <Typography variant="h4" component="h4" align="center">
                Find your new Favorite:
            </Typography>
            <SearchBar />
            {/* conditionally render search results if a search has been made*/}
            {query ? (
                <div className="search-view-margin">
                    <Typography variant="h5" component="h5" align="center">
                        Previous Search: {query}
                    </Typography>
                    {/* Clear button to navigate user back to /search parent route */}
                    <div className="center-this">
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClear}
                        >
                            Clear Search
                        </Button>
                    </div>
                    {/* Results components get mapped here */}
                    <Grid container className={classes.root} spacing={2} justify={'center'}>
                        <Grid item xs={10} lg={4}>
                            {searchedList.map(brewery => (
                            <SearchBreweryResult key={brewery.id} brewery={brewery} />
                            ))}
                        </Grid>
                    </Grid>
                </div>)
            : (
                // If no search has been done and user is at /search exact route, render the See What's Close button
                <div className="search-view-margin">
                    <Typography variant="h4" component="h4" align="center">
                        Or:
                    </Typography>
                    <div className="center-this">
                        <Button 
                        variant="contained"
                        color="primary"
                        onClick={seeWhatsClose}
                        >
                            See What's Close
                        </Button>
                    </div>
                </div>
            )
            }
            {/* Render the No Results message using logic above */}
            {showNoResults()}
        </div>
    )
}

export default SearchBreweries;