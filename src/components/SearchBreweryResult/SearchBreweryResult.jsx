// hooks
import { useHistory } from "react-router";
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
    
    
    console.log(brewery);
    return(
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

export default SearchBreweryResult;