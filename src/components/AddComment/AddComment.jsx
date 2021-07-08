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
    const handleSubmit = (event) => {
        event.preventDefault();
        // send the newComment body along with the id of the brewery it's being added to
        dispatch({ type: 'CREATE_NEW_COMMENT', payload: { 
            newComment: newComment, 
            breweryId: breweryId 
        }});
        // clear input
        setNewComment('');
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <TextField
                    inputProps={{ maxLength: 255 }}
                    className="text-field"
                    label="leave a comment"
                    variant="outlined"
                    onChange={handleChange}
                    value={newComment}
                >
                </TextField>
                <div className="form-button">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Add Comment
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default AddComment;