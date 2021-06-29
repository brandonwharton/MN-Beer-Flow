// Material-UI components
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Material-UI styles
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    control: {
        padding: theme.spacing(2),
    },
    card: {
        backgroundColor: '#999',
    },
}));

// component for the individual cards that are shown on the MyCommentsList view
function MyCommentsItem({comment}) {
    // use the correct Material-UI styles
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h5">
                    {comment.name} 
                </Typography>
                <Typography variant="body2" component="p">
                    {comment.comment}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MyCommentsItem;