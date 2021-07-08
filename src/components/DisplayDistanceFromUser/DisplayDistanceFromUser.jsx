// hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Material-UI components


// component that determines an accurate distance and drive time between the user and a provided brewery and displays the distance from user
function DisplayDistanceFromUser ({brewery}) {

    const userLocation = useSelector(store => store.location.userLocation)
    const [distanceFromUser, setDistanceFromUser] = useState(0);
    
    useEffect(() => {
        getDistanceFromUser();
    }, [])

    // uses Google's Distance Matrix to find the distance between the user and a provided brewery
    const getDistanceFromUser = () => {
        // save user location and destination as objects using data provided by location reducer and props
        const origin = new google.maps.LatLng(userLocation.latitude, userLocation.longitude);
        const destination = new google.maps.LatLng(brewery.latitude, brewery.longitude);

        // this function was originally set up to handle a request between one origin and multiple destinations. I left the code this way to make future
        // refactoring easier so this component could accomodate an array of destinations instead of one. Code that's commented out was used for this.

        // // create destinations for google to find
        // let destinationArray = [];
        // // go through list of user's favorite breweries, store the address information for each in the destination array
        // breweryArray.forEach(brewery => {
        //     console.log('brewery details', brewery);
        //     destinationArray.push(`${brewery.address} ${brewery.city}`);
        // })

        // request to Googles Distance Matrix service to get locations data
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                // destinations can be a Lat/Lng object or as a string of address and city
                destinations: [destination],
                travelMode: 'DRIVING',
            }, callback);

        // callback function that is called once Google's results come back
        function callback(response, status) {
            if (status == 'OK') {
                const origins = response.originAddresses;
                const destinations = response.destinationAddresses;
                const results = response.rows[0].elements

                let resultsArray = [];
                // loop through each result to store data locally, with the current component setup there's only one result in the array
                for (let j = 0; j < results.length; j++) {
                    const element = results[j];
                    console.log(element);
                    const distance = element.distance;
                    const duration = element.duration;
                    const from = origins[0];
                    const to = destinations[j];

                    // create an object with the returned distance data and store in the temporary resultsArray
                    const newDistanceObject = {
                        distance: distance,
                        duration: duration,
                        startingLocation: from,
                        destination: to
                    }
                    resultsArray.push(newDistanceObject);
                }
                // set local state for distance to the returned value, value comes back in meters
                setDistanceFromUser(resultsArray[0].distance.value)
            }
        }
    }


    return (
        // component renders the distance between the user and the chosen brewery as a number in miles rounded to one decimal point
        <>{(distanceFromUser/1609.34).toFixed(1)}</>
    )
}


export default DisplayDistanceFromUser;