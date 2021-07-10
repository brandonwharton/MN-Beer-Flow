// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import MyCommentsItem from '../MyCommentsItem/MyCommentsItem';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


// component that displays a list of the user's list of written comments
function MyCommentsList() {

    const dispatch = useDispatch();
    // get data from comments reducer
    const userCommentsList = useSelector(store => store.commentsList)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_COMMENTS' })
    }, [])

    console.log(userCommentsList);
    return (
        <div className="App-main-position">
            <Typography variant="h4" component="h4" align="center">
                Comments You've Left
            </Typography>
            <Grid container spacing={2} justify={'center'}>
                <Grid item xs={10} lg={6}>
                    {userCommentsList.map(comment => (
                        <MyCommentsItem key={comment.id} comment={comment} />
                    ))}
                </Grid>
            </Grid>

        </div>

    )
}

export default MyCommentsList;