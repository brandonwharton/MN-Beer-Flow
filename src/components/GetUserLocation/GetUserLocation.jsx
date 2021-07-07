import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader'
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
const libraries = ['geometry'];


// gets the user's location using Geolocation API
function GetUserLocation() {
    // load Map scripts
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
    });

    const dispatch = useDispatch();
    // get user location from redux store
    const location = useSelector(store => store.location);
    // const userFavorites = useSelector(store => store.breweryList);
    const breweryList = useSelector(store => store.breweryList);
    // states to temporarily store google results for my own use in parsing data responses
    const [locationData, setLocationData] = useState([]);
    const [googleResponse, setGoogleResponse] = useState({});
    

    useEffect(() => {
        // get list of user's favorite breweries on page load
        dispatch({ type: 'FETCH_ALL_BREWERIES' })

        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
            setMap(map);
        }
        // run getUserCoordinates to store user's location
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

    // request using Google maps to find the distance and drive time between two sets of latitude and longitude coordinates or addresses
    const calculateDistances = () => {
        if (isLoaded  && location.userLocation.latitude) {
        const origin1 = new google.maps.LatLng(location.userLocation.latitude, location.userLocation.longitude); // home
        // create destinations for google to find
        let destinationArray = [];
        // go through list of user's favorite breweries, store the address information for each in the destination array
        userFavorites.forEach(brewery => {
            console.log('brewery details', brewery);
            destinationArray.push(`${brewery.address} ${brewery.city}`);
        })
        // request to Googles Distance Matrix service to get multiple sets of locatations data
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: destinationArray,
            travelMode: 'DRIVING',
        }, callback);

        // callback function that is called once Google's results come back
        function callback(response, status) {
            if (status == 'OK') {
            const origins = response.originAddresses;
            const destinations = response.destinationAddresses;
            const results = response.rows[0].elements

            let resultsArray = [];
            // loop through each result to store data locally
            for (let j = 0; j < results.length; j++) {
                const element = results[j];
                console.log(element);
                const distance = element.distance;
                const duration = element.duration;
                const from = origins[0];
                const to = destinations[j];
                // console.log('in callback distance duration from to:', distance, duration, from, to);
                
                // create an object with the returned distance data and store in the temporary resultsArray
                const newDistanceObject = {
                    distance: distance,
                    duration: duration,
                    startingLocation: from,
                    destination: to
                }
                resultsArray.push(newDistanceObject);
            }
            // store results locally
            setLocationData(resultsArray);
            setGoogleResponse(response);
            }
        }
        }
    }

    
    // playing around with the Google Geometry Library
    const geometryLibraryDistance = () => {
        const origin = new google.maps.LatLng(44.8969841, -93.3669736); // home
        console.log(origin);
        const destination = new google.maps.LatLng(45.19812039, -93.38952559) // 10k
        console.log(destination);
        const result = google.maps.geometry.spherical.computeDistanceBetween(destination, origin);
        // const result = google.maps.geometry.spherical.computeHeading(destination, origin);
        console.log('result', result);
    }


    console.log('brewery list length', breweryList.length);
    // const breweryAddress = {
    //     address: '2005 2nd Ave',
    //     city: 'Anoka'
    // }

    
    const getCoordinates = () => {
        const breweryAddress = {
            address: breweryList[0].address,
            city: breweryList[0].city
        }
        dispatch({ type: 'FETCH_BREWERY_COORDINATES', payload: breweryAddress })
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
            <Button 
                variant="contained"
                color="secondary"
                onClick={getCoordinates}
            >
                Get Coordinates
            </Button>
        </div>
    ) : <></>
        

    
}

export default GetUserLocation;