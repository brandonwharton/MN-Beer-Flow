// hooks
import { useState } from 'react';
import { useHistory } from 'react-router';

// Material-UI components
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// component that renders a reusable search bar for use in a few places, all leading to the SearchBrewery component

function SearchBar() {
    const history = useHistory()
    // state for holding search string
    const [searchString, setSearchString] = useState('');


    // change handler to change the searchString state as user input is filled
    const handleChange = (event) => {
        setSearchString(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`/search/${searchString}`);

    }

    return (
        <div className="center-this">
            <form onSubmit={handleSubmit}>
                <TextField
                    className="text-field"
                    label="Search Breweries"
                    variant="outlined"
                    onChange={handleChange}
                    value={searchString}
                />
                <div className="form-button">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Look it up
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;