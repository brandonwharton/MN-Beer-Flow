import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

function BreweryDetails() {
    // need to : useDispatch to GET details
    // useSelector to use reducer
    // make reducer/saga 
    // make GET routes and router
    const dispatch = useDispatch();
    // hold database ID for page that was navigated to
    const { id } = useParams();

    // on navigation to specific details page, fetch details for specified brewery
    useEffect(()=> {
        dispatch({type: 'FETCH_SINGLE_BREWERY', payload: id});
    });

    return (
        <h2>In BreweryDetails: {id}</h2>
    )
}

export default BreweryDetails;