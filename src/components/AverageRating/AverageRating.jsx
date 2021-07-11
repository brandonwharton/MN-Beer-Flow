// hooks
import React from 'react';
// Material-UI components
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// component for displaying a read-only list of average rating for breweries
function AverageRating({averageRating}) {

    return (
        <div>
            <Box component="fieldset" mb={0} borderColor="transparent">
                <Typography component="legend">Average Rating:</Typography>
                <Rating
                    name="read-only"
                    size="large"
                    value={averageRating}
                    precision={0.5}
                    readOnly
                />
            </Box>
        </div>
    )
}

export default AverageRating;