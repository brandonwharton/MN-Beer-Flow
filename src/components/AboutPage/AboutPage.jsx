import React from 'react';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';



function AboutPage() {
  const user = useSelector(store => store.user)

  return (
    <div className="App-main-position container">
      <Typography variant="h4" component="h4">
          Welcome to MN Beer Flow
      </Typography>
      {user.username ?
      <Typography variant="body1" component="p">
          This app is designed to allow you to maintain a list of your favorite Minnesota breweries. Any place where you see a small card 
          with a brewery name and picture, click on it to get more details. You can rate any brewery by clicking on one of the rating stars.
          You can search for new breweries at the top, as well as choose a random brewery to help decide on one to visit!
      </Typography>
      :
      <Typography>
          This app is designed to allow you to maintain a list of your favorite Minnesota breweries. You can search Minnesota breweries, rate
          them, and choose a random brewery to help you decide where to visit!
      </Typography>
      }
    </div>
  );
}

export default AboutPage;
