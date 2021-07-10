// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-UI components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// not currently used
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

// components
import MyFavoritesItem from '../MyFavoritesItem/MyFavoritesItem';
import MyRatings from '../MyRatings/MyRatings';
import AverageRating from '../AverageRating/AverageRating';
import NewUserView from '../NewUserView/NewUserView';
import './MyFavoritesList.css';


// "Home Page" component after login that shows the user their list of breweries they've marked as favorite
function MyFavoritesList() {

    const dispatch = useDispatch();
    // access data from brewery reducer
    const favoriteBreweryList = useSelector(store => store.breweries.favoritesList)
    const user = useSelector(store => store.user);
    // states for handling the search input and the filtered search results array
    const [searchInput, setSearchInput] = useState('');
    const [searchedArray, setSearchedArray] = useState([]);
    const [foundNoResults, setFoundNoResults] = useState(false);
    
    // state for the order by Select menu - CURRENTLY INACTIVE
    // const [orderBy, setOrderBy] = useState('Rating');

    // on page load, get user's favorites
    useEffect(() => {
        // dispatch to brewery saga to GET any breweries marked as user favorites
        dispatch({ type: 'FETCH_FAVORITE_BREWERIES' });
    }, [])


    // change handler for search input
    const handleInputChange = (event) => {
        // adjust search input state on input change
        setSearchInput(event.target.value);
    }


    // changle handler for the Select menu to order data : CURRENTLY INACTIVE
    // const handleOrderChange = (event) => {
    //     console.log(event.target.value);
    //     setOrderBy(event.target.value);
    // }


    // submit handler for the search favorites feature
    const handleSearch = () => {
        event.preventDefault();
        // reset foundNoResults to remove conditionally rendered no results message
        setFoundNoResults(false);

        let tempArray = []
        // filter through the favoriteBreweryList array looking for search matches to a brewery name
        tempArray = favoriteBreweryList.filter(brewery => {
            console.log('brewery names', brewery.name);
            // return any name matches ignoring case
            if (brewery.name.toUpperCase().includes(searchInput.toUpperCase())) {
                return brewery;
            }
        })
        // set state for the conditional for foundNoResults to true if no results were found to render no results message
        if (tempArray.length === 0) {
            setFoundNoResults(true);
        }
        // set the searchedArray state to the filtered array, will be empty if no search results appear
        setSearchedArray(tempArray);
        // clear input
        setSearchInput('');
    }


    return (
        <div className="App-main-position">
            {/* Conditionally render the favorites view normally if the user has brewery data in their favorites list*/}
            {favoriteBreweryList.length > 0 ?
                <section>
                    <div className="my-favorites-parent">
                        <div className="my-favorites-child">
                            <Typography variant="h4" component="h4" align="center">
                                {user.username}'s Favorites
                            </Typography>
                            
                            <form onSubmit={handleSearch}>
                                <div className="center-this">
                                    <TextField
                                        className="text-field"
                                        label="search favorites"
                                        variant="outlined"
                                        value={searchInput}
                                        onChange={handleInputChange}
                                    />
                                    <div className="form-button">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* This is a an unfinished sorting feature for the favorites list */}

                    {/* <InputLabel id="favorites-order-by-label">Order By</InputLabel>
                    <Select
                        labelId="favorites-order-by-label"
                        id="favorites-order-by"
                        value={orderBy}
                        onChange={handleOrderChange}
                    >
                        <MenuItem value={'Rating'}>Your Top Rated</MenuItem>
                        <MenuItem value={'Closest'}>Closest Distance</MenuItem>
                    </Select> */}


                    <Grid container spacing={2} justify={'center'}>
                        <Grid item xs={9} lg={4}>
                            {/* conditionally render a no results message for failed searches */}
                            {foundNoResults &&
                                <Typography variant="h4" component="h4" align="center" gutterBottom="true">
                                    No Results Found
                                </Typography>}

                            {/* conditionally render either the full list of user favorites or the search results if a search was done */}
                            {searchedArray.length === 0 ?
                                favoriteBreweryList?.map(brewery => (
                                    <div key={brewery.id}>
                                        <MyFavoritesItem brewery={brewery} />
                                        <MyRatings breweryId={brewery.id} origin={'myFavorites'} rating={brewery.rating} />
                                        <AverageRating averageRating={brewery.average_rating} />
                                    </div>
                                ))
                                :
                                searchedArray.map(brewery => (
                                    <div key={brewery.id}>
                                        <MyFavoritesItem brewery={brewery} />
                                        <MyRatings breweryId={brewery.id} origin={'myFavorites'} rating={brewery.rating} />
                                        <AverageRating averageRating={brewery.average_rating} />
                                    </div>
                                ))
                            }
                        </Grid>
                    </Grid>
                </section>
                :
                // Display the NewUserView component if no favorites have been added
                <NewUserView />
            }
        </div>

    )
}

export default MyFavoritesList;