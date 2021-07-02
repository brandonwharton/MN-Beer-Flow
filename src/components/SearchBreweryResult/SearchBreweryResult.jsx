// hooks
import { useHistory } from "react-router";
// components
import AverageRating from '../AverageRating/AverageRating';
import AddToFavorites from '../AddToFavorites/AddToFavorites';
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'



// Material-UI styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    control: {
        padding: theme.spacing(2),
    },
    card: {
        backgroundColor: '#aaa',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
}));


// component to display the clickable cards after brewery searches
function SearchBreweryResult({brewery}) {
    const history = useHistory();
    const classes = useStyles();

    const handleClick = (id) => {
        // on click of the brewery card, send user to the details view for that brewery
        history.push(`/details/${id}`)
    }
    
    
    return(
        <Card className={classes.card} >
            <CardHeader 
                title={brewery.name}
                onClick={() => handleClick(brewery.id) }
            >
            </CardHeader>
            <CardMedia
                className={classes.media}
                image={brewery.image_url}
                onClick={() => handleClick(brewery.id) }
            />
            {/* evaluate needs below this */}
            <CardContent
                onClick={() => handleClick(brewery.id) }
            >
                <Typography variant="h6" component="h6">
                    {brewery.city}
                </Typography>
                <AverageRating averageRating={brewery.average_rating} />
            </CardContent>
            <AddToFavorites breweryId={brewery.id} origin={'searchResults'}/>
            
        </Card>
    )
}

export default SearchBreweryResult;