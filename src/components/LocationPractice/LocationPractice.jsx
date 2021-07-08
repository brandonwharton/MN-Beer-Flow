import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader'
require('dotenv').config();
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';

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

// gets the user's location using Geolocation API
function LocationPractice({isLoaded}) {
    // load Map scripts
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: apiKey,
    //     libraries,
    // });

    const dispatch = useDispatch();
    // get user location from redux store
    const location = useSelector(store => store.location);
    
    const allBreweries = useSelector(store => store.breweries.allBreweries);
    // states to temporarily store google results for my own use in parsing data responses
    const [locationData, setLocationData] = useState([]);
    const [googleResponse, setGoogleResponse] = useState({});
    

    useEffect(() => {
        // get list of user's favorite breweries on page load
        // dispatch({ type: 'FETCH_FAVORITE_BREWERIES' })
        // get list of all breweries on page load
        dispatch({ type: 'FETCH_ALL_BREWERIES'})

        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
            setMap(map);
        }
        // run getUserCoordinates to store user's location

    }, [])

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

    let sortedByDistanceArray = [];
    // playing around with the Google Geometry Library
    const geometryLibraryDistance = (inputArray, userLocation) => {
        const userLatitude = location.userLocation.latitude;
        const userLongitude = location.userLocation.longitude;
        const origin = new google.maps.LatLng(userLatitude, userLongitude); // home
        
        // loop over breweries and find the Spherical Geometry distance between them
        inputArray.forEach(brewery => {
            const destination = new google.maps.LatLng(brewery.latitude, brewery.longitude)
            const result = google.maps.geometry.spherical.computeDistanceBetween(destination, origin);
            brewery.sphericalDistance = result;
        })
        // const destination = new google.maps.LatLng(45.19812039, -93.38952559) // 10k
        // console.log(destination);
        // const result = google.maps.geometry.spherical.computeDistanceBetween(destination, origin);
        // const result = google.maps.geometry.spherical.computeHeading(destination, origin);
        console.log(allBreweries);
        sortedByDistanceArray = allBreweries.sort(function(a, b) {
            return a.sphericalDistance - b.sphericalDistance;
        })
        console.log(sortedByDistanceArray);
    }


    const showMeState = () => {
        console.log(locationData);
        console.log('google response', googleResponse);
    }


    console.log('location reducer', location.userLocation);
    return isLoaded ? (
        <div>
            <GetUserLocation />
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

export default LocationPractice;