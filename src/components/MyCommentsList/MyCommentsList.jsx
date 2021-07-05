// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import MyCommentsItem from '../MyCommentsItem/MyCommentsItem';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

// component that displays a list of the user's list of written comments
function MyCommentsList() {
    // use the correct Material-UI styles
    const classes = useStyles();

    const dispatch = useDispatch();
    // get data from comments reducer
    const userCommentsList = useSelector(store => store.commentsList)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_COMMENTS' })
    }, [])

    console.log(userCommentsList);
    return (
        <div className="App-main-position">
            <Typography variant="h4" component="h4">
                Comments You've Left
            </Typography>
            <Grid container className={classes.root} spacing={2} justify={'center'}>
                <Grid item xs={10}>
                    {userCommentsList.map(comment => (
                        <MyCommentsItem key={comment.id} comment={comment} />
                    ))}
                    {/* {comments?.map(comment => (
                        <Card key={comment.id} className={classes.card}>
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    {comment.username} wrote:
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {comment.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))} */}

                </Grid>
            </Grid>

        </div>

    )
}

export default MyCommentsList;