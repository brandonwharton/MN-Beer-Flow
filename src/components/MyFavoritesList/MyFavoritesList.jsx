import { useEffect } from "react";
import { useDispatch } from "react-redux";


// "Home Page" component after login that shows the user their list of breweries they've marked as favorite
function MyFavoritesList() {
    const dispatch = useDispatch();

    // on page load, get user's favorites
    useEffect(() => {
        // dispatch brewery saga to GET any breweries marked as user favorites
        dispatch({ type: 'FETCH_USER_FAVORITES' });
    }, [])

    return (
        <h2>In MyFavoritesList</h2> 
    )
}

export default MyFavoritesList;