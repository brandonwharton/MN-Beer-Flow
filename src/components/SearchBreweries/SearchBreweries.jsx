// hooks
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// components
import SearchBreweryResult from '../SearchBreweryResult/SearchBreweryResult';
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    const breweryList = useSelector(store => store.breweryList);
    // state for holding search string
    const [searchString, setSearchString] = useState('');
    // using params to track searches after a user has made one while still staying on this base component
    const { query } = useParams();

    useEffect(() => {
        if (query) {
            dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: query })
        }
    }, [query])

    // change handler to change the searchString state as user input is filled
    const handleChange = (event) => {
        setSearchString(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`/search/${searchString}`);

    }


    return (
        <div>
            <FormControl onSubmit={handleSubmit}>
                <TextField
                    label="Search Breweries"
                    helperText="by name only"
                    variant="outlined"
                    onChange={handleChange}
                    value={searchString}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Search
                </Button>
            </FormControl>
            {/* conditionally render search results */}
            {query &&
                <div>
                    <Typography variant="h5" component="h5">
                        Previous Search: {query}
                    </Typography>
                    <Grid container className={classes.root} spacing={2} justify={'center'}>
                        <Grid item xs={10}>
                            {breweryList.map(brewery => (
                            <SearchBreweryResult key={brewery.id} brewery={brewery} />
                            ))}
                        </Grid>
                    </Grid>

                </div>
            }
        </div>
    )
}

export default SearchBreweries;