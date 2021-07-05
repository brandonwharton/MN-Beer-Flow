import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';
require('dotenv').config();

const containerStyle = {
    width: '400px',
    height: '400px',
};

const center = {
    lat: 44.8969942,
    lng: -93.3670538,
};

const apiKey = process.env.REACT_APP_MAPS_API_KEY;

// gets the user's location using Geolocation API
function GetUserLocation() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    const [map, setMap] = useState(null)



    const dispatch = useDispatch();
    const location = useSelector(store => store.location);

    // const loader = new Loader({
    //     apiKey: process.env.MAPS_API_KEY,
    //     version: 'weekly',
    //     ...additionalOptions,
    // });
    // loader.load.then(() => {
    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: { lat: -34.397, lng: 150.644},
    //         zoom: 8,
    //     });
    // });

    // let map;

    // function initMap() {
    //     map = new google.maps.Map(document.getElementById("map"), {
    //         center: {lat: -34.397, lng: 150.644},
    //         zoom: 8,
    //     });
    // }


    useEffect(() => {
        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
            setMap(map);
        }
        getUserCoordinates();
    }, [])

    // makes a request to get the user's latitude and longitude coordinates and send them to the location reducder
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

    // var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    // var destinationA = new google.maps.LatLng();
    // var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    // var service = new google.maps.DistanceMatrixService();
    // service.getDistanceMatrix(
    // {
    //     origins: [origin1, origin2],
    //     destinations: [destinationA, destinationB],
    //     travelMode: 'DRIVING',
    //     transitOptions: TransitOptions,
    //     drivingOptions: DrivingOptions,
    //     unitSystem: UnitSystem,
    //     avoidHighways: Boolean,
    //     avoidTolls: Boolean,
    // }, callback);

    // function callback(response, status) {
    // // See Parsing the Results for
    // // the basics of a callback function.
    // }

    console.log('location reducer', location.userLocation);
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            <></>
        </GoogleMap>
    ) : <></>
        

    
}

export default GetUserLocation;