
// reusable function that takes in an array of brewery objects and the user's geographical coordinates, then uses the Google Distance Matrix to 
// determine an accurate distance and drive time between the user and each of the given breweries
const distanceFromUser = (inputArray, userLocation) => {
    const origin = new google.maps.LatLng(userLocation.latitude, userLocation.longitude);
    // // create destinations for google to find
    // let destinationArray = [];
    // // go through list of user's favorite breweries, store the address information for each in the destination array
    // userFavorites.forEach(brewery => {
    //     console.log('brewery details', brewery);
    //     destinationArray.push(`${brewery.address} ${brewery.city}`);
    // })
    // request to Googles Distance Matrix service to get multiple sets of locatations data
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: inputArray,
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
            console.log(resultsArray);
        }
    }
}



export default distanceFromUser