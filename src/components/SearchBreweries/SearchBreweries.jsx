// hooks
import { useHistory, useParams } from "react-router";
import { useState } from "react";
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
    const searchedList = useSelector(store => store.breweries.breweryList);
    // state for holding search string
    const [searchString, setSearchString] = useState('');
    // using params to track searches after a user has made one while still staying on this base component
    const { query } = useParams();

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


    const showNoResults = () => {
        if (query && searchedList.length === 0) {
            return <Typography variant="h3" component = "h3">
                No Results Found
            </Typography>
        }
    }

    return (
        <div className="App-main-position">
            <Typography variant="h4" component="h4" align="center">
                Find your new Favorite:
            </Typography>
            <SearchBar />
            {/* conditionally render search results */}
            {query ? (
                <div className="search-view-margin">
                    <Typography variant="h5" component="h5" align="center">
                        Previous Search: {query}
                    </Typography>
                    <div className="center-this">
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClear}
                        >
                            Clear Search
                        </Button>
                    </div>
                    <Grid container className={classes.root} spacing={2} justify={'center'}>
                        <Grid item xs={10} lg={4}>
                            {searchedList.map(brewery => (
                            <SearchBreweryResult key={brewery.id} brewery={brewery} />
                            ))}
                        </Grid>
                    </Grid>
                </div>)
            : (
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
            {showNoResults()}
            <GetUserLocation />
        </div>
    )
}

export default SearchBreweries;