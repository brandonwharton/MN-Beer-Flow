// components
import SearchBar from '../SearchBar/SearchBar';
// Material-UI components
import Typography from '@material-ui/core/Typography';

// component that gets conditionally rendered instead of MyFavoritesList when a user logs onto the app for the first time and hasn't added
// any breweries to their list of favorites
function NewUserView() {

    return (
        <div className="container">
            <Typography variant="h4" component="h4">
                Welcome to MN Beer Flow
            </Typography>
            <Typography variant="body1" component="p">
                This app is designed to allow you to maintain a list of your favorite Minnesota breweries. Any place where you see a small card 
                with a brewery name and picture, click on it to get more details. You can also comment on the brewery from this details page.
                You can rate any brewery by clicking on one of the rating stars. Search for new breweries using the link at the top. Go With the Flow
                lets you randomly select a brewery to help you decide where to visit!
            </Typography>
            <br></br>
            <Typography variant="body1" component="p">
                Your favorites list is currently empty. Search for new breweries to add here
            </Typography>
            <SearchBar />
        </div>
    )
}

export default NewUserView;