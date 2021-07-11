// hooks
import React from 'react';
import { useDispatch } from 'react-redux';
// Material-UI components
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



// component for displaying user brewery ratings, allows user to adjust ratings fluidly with DB updates no matter where this component is displayed
// needs to be given props for the breweryId and the brewery's rating. Origin is a string which is different depending on which component
// is rendering the ratings which helps with redux data re-renders when the user adjusts ratings. Current origin strings are 'breweryDetails' for 
// mounts from the BreweryDetails component and 'myFavorites' for mounts from the MyFavorites component. All logic using origins is handled in the
// ratings saga

function MyRatings({breweryId, origin, rating}) {
    const dispatch = useDispatch();
    // create a unique name for the Material-UI Rating component using the breweryId
    const componentName = `rating${breweryId}`; 

    // change handler for whenever a user clicks on a different rating star to change their rating
    const handleChange = (event) => {
        dispatch({ type: 'SET_RATING_VALUE', payload: {
            newRating: Number(event.target.value), 
            breweryId: breweryId,
            // origin are props that contain a string with the name of the component that the rating is a child of to assist in saga refresh after updates
            origin: origin
        }})
    }


    return (
        <div>
            <Box component="fieldset" mb={0} borderColor="transparent">
                <Typography component="legend">Your Rating:</Typography>
                <Rating
                    name={componentName}
                    size="large"
                    value={rating}
                    // precision={0.5} : Option to allow users to rate in half-star increments. Stars are too small to be UI friendly on a 
                    // mobile device for half ratings
                    onChange={() => handleChange(event)}
                />
            </Box>
        </div>
    )
}

export default MyRatings;
