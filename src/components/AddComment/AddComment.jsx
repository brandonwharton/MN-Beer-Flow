// hooks
import { useDispatch } from 'react-redux';
import { useState } from 'react';
// Material-UI components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';






// component for a form to add a comment to a brewery
function AddComment({breweryId}) {
    const dispatch = useDispatch();
    // state to track changes to TextField
    const [newComment, setNewComment] = useState('');

    // change handler for comment TextField
    const handleChange = (event) => {
        // set state to whatever is being typed into TextField by user
        setNewComment(event.target.value);
    }

    // click handler to dispatch newComment to comments saga
    const handleClick = () => {
        dispatch({ type: 'CREATE_NEW_COMMENT', payload: newComment });
        // clear input
        setNewComment('');
    }


    return (
        <div>
            <TextField
                label="leave a comment"
                onChange={handleChange}
                value={newComment}
            >
            </TextField>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Add Comment
            </Button>
        </div>

    )
}

export default AddComment;