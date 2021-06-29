// hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// component that displays a list of the user's list of written comments
function MyCommentsList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_COMMENTS' })
    }, [])

    return(
        <h2>In MyCommentsList</h2>
    )
}

export default MyCommentsList;