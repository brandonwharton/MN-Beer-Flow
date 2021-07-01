// hooks
import { useHistory, useParams } from "react-router";
// Material-UI components
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


// component that populates a search bar to search for breweries throughout the entire database and render the results
function SearchBreweries() {
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

    console.log('in SearchBreweries: Query: Input', query);
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
            <h3>{query}</h3>
        </div>
    )
}

export default SearchBreweries;