// hooks 
import { useEffect } from "react";
import { useDispatch } from "react-redux";


// reusable function that uses geolocation to get the user's current location
// takes a few seconds to get data back
function GetUserLocation() {
    const dispatch = useDispatch();
   
    // wherever this component gets mounted, run getUserCoordinates
    useEffect(() => {
        getUserCoordinates();
    }, [])

    // uses geolocation to get the user's current geographical location. 
    const getUserCoordinates = () => {
        // get geographical coordinates
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            // once coordinates are received, dispatch them to the reducer
            dispatch({ type: 'SET_USER_COORDINATES', payload: {
                latitude: latitude,
                longitude: longitude
            }});
        });
    }
    // no need to render anything
    return (
        <></>
    )
}

export default GetUserLocation;