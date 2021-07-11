// hooks
import React from 'react';
import { useSelector } from 'react-redux';
// Material-UI components
import Typography from '@material-ui/core/Typography';


// an About component to render some informational text, text is more detailed if there's a user logged in
function AboutPage() {
  const user = useSelector(store => store.user)

  return (
    <div className="App-main-position container">
      <Typography variant="h4" component="h4" gutterBottom>
          Welcome to MN Beer Flow
      </Typography>

      {/* Renders a more detailed description of App features if the user is logged in */}
      {user.username ?
      <>
        <Typography variant="body1" component="p" gutterBottom>
          This app is designed to allow you to maintain a list of your favorite Minnesota breweries. Any place where you see a small card 
          with a brewery name and picture, click on it to get more details. You can also comment on the brewery from this details page.
          You can rate any brewery by clicking on one of the rating stars. Search for new breweries using the link at the top. See What's 
          Close shows you the ten breweries closest to you. Go With the Flow lets you randomly select a brewery to help you decide where to visit! 
        </Typography>
        <Typography variant="body1" component="p">
          Use of Location Services is required.
        </Typography>
      </>
      :
      // If no user is logged in, render the below text.
      <>
        <Typography variant="body1" component="p" gutterBottom>
            This app is designed to allow you to maintain a list of your favorite Minnesota breweries. You can search Minnesota breweries, rate
            them, comment about them, see what's close by, and choose a random brewery to help you decide where to visit!
        </Typography>
        <Typography variant="body1" component="p">
          Use of Location Services is required.
        </Typography>
      </>
      }
    </div>
  );
}


export default AboutPage;
