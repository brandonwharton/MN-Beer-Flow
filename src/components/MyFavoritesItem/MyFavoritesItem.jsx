// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'
// will likely need card actions for ratings


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

// component that displays the clickable cards on MyFavoritesList
function MyFavoritesItem({brewery}) {
    // use the correct Material-UI styles
    const classes = useStyles();

    console.log(brewery);
    return (
        <Card className={classes.card}>
            <CardHeader
                title={brewery.name}
            >
            </CardHeader>
            <CardMedia
                className={classes.media}
                image={brewery.image_url}
            />
            <CardContent>
                {/* Ratings details will go here */}
            </CardContent>
        </Card>
    )
}

export default MyFavoritesItem;