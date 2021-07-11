// hooks
import { useHistory } from "react-router";
// components
import AverageRating from '../AverageRating/AverageRating';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'

import breweryCardTheme from '../../material-ui-themes/brewery.card.theme';


// Material-UI styles
const useStyles = breweryCardTheme;


// component to render the clickable cards and a brewery's average rating after a brewery search is made on the SearchBar
function SearchBreweryResult({brewery}) {
    // use correct Material-UI classes
    const classes = useStyles();
    const history = useHistory();

    // click handler for navigation when a user clicks on a search result card
    const handleClick = (id) => {
        // on click of the brewery card, send user to the details view for that brewery
        history.push(`/details/${id}`)
    }
    
    
    return(
        <div>
            <Card className={classes.card} onClick={() => handleClick(brewery.id)}>
                <CardHeader 
                    title={brewery.name}
                >
                </CardHeader>
                <CardMedia
                    className={classes.media}
                    image={brewery.image_url}
                />
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {brewery.city}
                    </Typography>
                </CardContent>
            </Card>
            <AverageRating averageRating={brewery.average_rating} />
        </div>
    )
}

export default SearchBreweryResult;