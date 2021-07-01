// hooks
import { useParams } from "react-router";
// Material-UI components
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// component that populates a search bar to search for breweries throughout the entire database and render the results
function SearchBreweries() {
const { query } = useParams();
    return (
        <div>
            <FormControl >
                <TextField 
                    label="Search Breweries"
                    helperText="by name only"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                >
                    Search
                </Button>
            </FormControl>
        </div>
    )
}

export default SearchBreweries;