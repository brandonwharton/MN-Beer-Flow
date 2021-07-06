import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';
require('dotenv').config();

import Button from '@material-ui/core/Button';


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
    const calculateDistances = () => {
        if (isLoaded) {
        var origin1 = new google.maps.LatLng(44.8969866, -93.3670445); // home
        var destinationA = new google.maps.LatLng(45.19812039, -93.38952559); // 10k
        var destinationB = new google.maps.LatLng(44.89304675, -93.2813885); // wild minds

        console.log(origin1);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: [destinationA, destinationB],
            travelMode: 'DRIVING',
        }, callback);

        function callback(response, status) {
            if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            const results2 = response.rows
            console.log('results2', results2);
        
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                var element = results[j];
                console.log(element);
                // var distance = element.distance.text;
                // var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
                console.log('in callback distance duration from to:', from, to);
                }
            }
            }
        }
        }
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
                zoom={10}
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
        </div>
    ) : <></>
        

    
}

export default GetUserLocation;