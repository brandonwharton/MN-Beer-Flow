// Material-UI components
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

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
        backgroundColor: '#cbcbc9',
    },
}));

// component for the individual cards that are shown on the MyCommentsList view
function MyCommentsItem({comment}) {
    // use the correct Material-UI styles
    const classes = useStyles();

    const dispatch = useDispatch();

    // click handler for Remove Comment buttons to delete the comment
    const handleClick = (commentId, userId) => {
        // dispatch an action to delete the selected comment
        dispatch({ type: 'REMOVE_USER_COMMENT', payload: { commentId: commentId, userId: userId }});
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" component="h6">
                    {comment.name} 
                </Typography>
                <Typography variant="body2" component="p">
                    {comment.comment}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClick(comment.id, comment.user_id)}
                >
                    Remove Comment
                </Button>
            </CardActions>
        </Card>
    )
}

export default MyCommentsItem;