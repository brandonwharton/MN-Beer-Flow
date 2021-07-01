// hooks
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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


// check to see if this is necessary
function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};


// component for displaying a read-only list of average rating for breweries
function AverageRating({breweryId}) {

    return (

        <h3>In AverageRating {breweryId}</h3>
    )
}

export default AverageRating;