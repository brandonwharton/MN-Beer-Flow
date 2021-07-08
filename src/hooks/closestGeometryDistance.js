

// reusable function that takes in an array of breweries along with the user's current geographical coordinates, uses the Spherical Geometry library
// from Google to find exact geographical (not driving) distances between the user and each brewery location, saves the distances as a new key on 
// each brewery object, then returns a new array sorted by closest to farthest away
const closestGeometryDistance = (inputArray, userLocation) => {
    console.log('in closestGeometry:', inputArray, userLocation);
    
    let sortedByDistanceArray = []
    const origin = new google.maps.LatLng(userLocation.latitude, userLocation.longitude); 
    
    // loop over provided breweries and find the Spherical Geometry distance between the user and each of them and save the spherical distance as a new
    // key on the brewery object
    inputArray.forEach(brewery => {
        const destination = new google.maps.LatLng(brewery.latitude, brewery.longitude)
        const result = google.maps.geometry.spherical.computeDistanceBetween(destination, origin);
        brewery.sphericalDistance = result;
    })

    // sort the breweries by using the spherical distance to return an array that's filtered closest to farthest from the user
    sortedByDistanceArray = inputArray.sort(function(a, b) {
        return a.sphericalDistance - b.sphericalDistance;
    })
    return sortedByDistanceArray
}




export default closestGeometryDistance;