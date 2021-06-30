// hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);


// // check to see if this is necessary
// function IconContainer(props) {
//     const { value, ...other } = props;
//     return <span {...other}>{customIcons[value].icon}</span>
// }

// IconContainer.propTypes = {
//     value: PropTypes.number.isRequired,
// };
// // through here


// component for displaying user brewery ratings, allowing user to adjust ratings fluidly
function MyRatings({breweryId}) {
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);

    // useEffect(() => {
        
    // }, [])

    const handleChange = (event) => {
        dispatch({ type: 'SET_RATING_VALUE', payload: {
            newRating: Number(event.target.value), 
            breweryId: breweryId
        }})
        setRating(Number(event.target.value));
    }

    
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Your Rating</Typography>
                <Rating
                    name="simple-controlled"
                    size="large"
                    value={rating}
                    // precision={0.5} : play around with this, may be too small
                    onChange={() => handleChange(event)}
                    // onChange={(event, newRating) => {
                    //     setRating(newRating);
                    // }}
                />
            </Box>
        </div>
    )
}

export default MyRatings;
