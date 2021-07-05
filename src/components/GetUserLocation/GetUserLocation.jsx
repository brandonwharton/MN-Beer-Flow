import { useEffect, useState } from "react";

// gets the user's location using Geolocation API
function GetUserLocation() {

    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        getUserCoordinates();
    }, [])

    const getUserCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log('lat and long:', latitude, longitude);
            
            setCoordinates({
                latitude: latitude,
                longitude: longitude
            })
            })
    }

    console.log('coordinates:', coordinates);
    return (
        <h2>In GetUserLocation</h2>
    )
}

export default GetUserLocation;