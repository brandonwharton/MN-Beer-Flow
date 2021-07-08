
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap } from '@react-google-maps/api';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';

// *************************** COMPONENT IS FOR TESTING ONLY: NO ROUTES EXIST CURRENTLY ****************************

// map sizing
const containerStyle = {
    width: '100vw',
    height: '100vw',
};

// map starting location, needs to be adjusted with user-specific location data. Map works and loads if actual coordinates are input in the 
// lat and lng keys below 

// const center = {
//     lat: location.userLocation.latitude,
//     lng: location.userLocation.longitude,
// };

// renders a Google Map,
function CreateGoogleMap({isLoaded}) {

    const dispatch = useDispatch();
    // get user location from redux store
    const location = useSelector(store => store.location);
    

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
        </div>
    ) : <></>
        

    
}

export default CreateGoogleMap;