// hooks
import { useHistory } from 'react-router';
// components
import MyRatings from '../MyRatings/MyRatings';
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'

import breweryCardTheme from '../../material-ui-themes/brewery.card.theme';
// will likely need card actions for ratings


// Material-UI styles
const useStyles = breweryCardTheme;

// component that displays the clickable cards on MyFavoritesList
function MyFavoritesItem({brewery}) {
    // use the correct Material-UI styles
    const classes = useStyles();
    // bring in useHistory for navigation
    const history = useHistory();

    // click handler for somebody clicking on a brewery card, sends them to the details page for that brewery
    const handleClick = (id) => {
        // send the user to the details page for the specific brewery
        history.push(`/details/${id}`);
    }
    
    return (
        <Card className={classes.card} onClick={() => handleClick(brewery.id) }>
            <CardHeader
                title={brewery.name}
            >
            </CardHeader>
            <CardMedia
                className={classes.media}
                image={brewery.image_url}
            />
            {/* evaluate needs below this */}
            <CardContent>
                <Typography variant="h6" component="h6">
                    {brewery.city}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MyFavoritesItem;