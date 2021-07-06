import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
require('dotenv').config();

import Button from '@material-ui/core/Button';

// map sizing
const containerStyle = {
    width: '100vw',
    height: '100vw',
};

// map starting location
const center = {
    lat: 44.8969942,
    lng: -93.3670538,
};

const apiKey = process.env.REACT_APP_MAPS_API_KEY;

// gets the user's location using Geolocation API
function GetUserLocation() {
    // load google maps data
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        // libraries: ["Places"]
    })

    // const [map, setMap] = useState(null)



    const dispatch = useDispatch();
    // get user location from redux store
    const location = useSelector(store => store.location);
    const userFavorites = useSelector(store => store.breweryList);

    const [locationData, setLocationData] = useState([]);
    const [googleResponse, setGoogleResponse] = useState({});
    



    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITE_BREWERIES' })


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
    const calculateDistances = () => {
        if (isLoaded && location.userLocation.latitude) {
        const origin1 = new google.maps.LatLng(location.userLocation.latitude, location.userLocation.longitude); // home
        // create destinations for google to find
        let destinationArray = [];
        userFavorites.forEach(brewery => {
            console.log('brewery details', brewery);
            destinationArray.push(`${brewery.address} ${brewery.city}`);
        })
        
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: destinationArray,
            travelMode: 'DRIVING',
        }, callback);

        function callback(response, status) {
            if (status == 'OK') {
            const origins = response.originAddresses;
            const destinations = response.destinationAddresses;
            const results = response.rows[0].elements

            let resultsArray = [];
            for (var j = 0; j < results.length; j++) {
                const element = results[j];
                console.log(element);
                const distance = element.distance;
                const duration = element.duration;
                const from = origins[0];
                const to = destinations[j];
                // console.log('in callback distance duration from to:', distance, duration, from, to);
                const newDistanceObject = {
                    distance: distance,
                    duration: duration,
                    startingLocation: from,
                    destination: to
                }
                resultsArray.push(newDistanceObject);
            }
            setLocationData(resultsArray);
            setGoogleResponse(response);
            }
        }
        }
    }

    // playing around with the Google Geometry Library
    const geometryLibraryDistance = () => {
        const origin = new google.maps.LatLng(44.8969841, 93.3669736); // home
        console.log(origin);
        const destination = new google.maps.LatLng(45.19812039, -93.38952559)
        console.log(destination);
        const result = google.maps.geometry.spherical.computeDistanceBetween(destination, origin);
        console.log('result', result);
    }



    const showMeState = () => {
        console.log(locationData);
        console.log('google response', googleResponse);
    }

    // function callback(response, status) {
    //     if (status == 'OK') {
    //         var origins = response.originAddresses;
    //         var destinations = response.destinationAddresses;

    //         for (let i = 0; i < origins.length; i++) {
    //             var results = response.rows[i].elements;
    //             for (let j = 0; j < results.length; j++) {
    //                 var element = results[j];
    //                 var distance = element.distance?.text;
    //                 var duration = element.duration?.text;
    //                 var from = origins[i];
    //                 var to = destinations[j];
    //                 console.log('in callback distance duration from to:', distance, duration, from, to);
    //             }
    //         }
    //     }
    // }
    

    console.log('location reducer', location.userLocation);
    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                <></>   
            </GoogleMap>
            <Button
                variant="contained"
                color="primary"
                onClick={calculateDistances}
            >
                Calculate Distances
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={geometryLibraryDistance}
            >
                Spherical Geometry Distance
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={showMeState}
            >
                Show me State
            </Button>
        </div>
    ) : <></>
        

    
}

export default GetUserLocation;