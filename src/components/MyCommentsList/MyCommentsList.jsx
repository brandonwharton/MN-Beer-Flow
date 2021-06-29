// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import MyCommentsItem from '../MyCommentsItem/MyCommentsItem';

// component that displays a list of the user's list of written comments
function MyCommentsList() {
    const dispatch = useDispatch();
    // get data from comments reducer
    const userCommentsList = useSelector(store => store.commentsList)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_COMMENTS' })
    }, [])

    console.log(userCommentsList);
    return(
        <div>
            {userCommentsList.map(comment => (
                <MyCommentsItem key={comment.id} comment={comment} />
            ))}
        </div>

    )
}

export default MyCommentsList;