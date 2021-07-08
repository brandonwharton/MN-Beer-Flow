import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
require('dotenv').config();
// provided boilerplate components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
// my components
import Header from '../Header/Header';
import GetUserLocation from '../GetUserLocation/GetUserLocation';
import MyFavoritesList from '../MyFavoritesList/MyFavoritesList';
import MyCommentsList from '../MyCommentsList/MyCommentsList';
import BreweryDetails from '../BreweryDetails/BreweryDetails';
import SearchBreweries from '../SearchBreweries/SearchBreweries';
import FindTenClosest from '../FindTenClosest/FindTenClosest';
import RandomBrewery from '../RandomBrewery/RandomBrewery';
import LocationPractice from '../LocationPractice/LocationPractice';
// Material-UI components
import '@fontsource/roboto';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#946644',
      main: '#713229',
      dark: '#413330',
      // Contrast text?
    },
    secondary: {
      light: '#cbcbc9',
      main: '#b7987b',
      dark: '#46626e',
      // Contrast text?
    },
    // this is the color chosen for the navbar links, error was the easiest way to override an icon color
    error: {
      main: '#cbcbc9'
    },
  },
  typography: {
    fontFamily: [
      '"Lexend"',
      'Verdana',
      'Geneva',
      'Tahoma',
      'sans-serif',
    ].join(','),
  },
});

// needed information for Google Maps to be brought in 
const apiKey = process.env.REACT_APP_MAPS_API_KEY;
const libraries = ['geometry'];




function App() {
  const dispatch = useDispatch();
  // load Map scripts
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
      <div>
        <GetUserLocation />
        <Header />
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/myfavorites */}
          <Redirect exact from="/" to="/myfavorites" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the MyFavorites if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows MyFavorites page else shows the LoginPage
            exact
            path="/myfavorites"
          >
            <MyFavoritesList />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/myfavorites"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/myfavorites"
          >
            <RegisterPage />
          </ProtectedRoute>

          {/******************** My Routes *********************/}
          <ProtectedRoute
            exact
            path="/myfavorites"
          >
            <MyFavoritesList />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/mycomments"
          >
              <MyCommentsList />
          </ProtectedRoute>          
          <ProtectedRoute
            path="/details/:id"
            children={<BreweryDetails />}
          >
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/search"
          >
            <SearchBreweries />
          </ProtectedRoute>
          <ProtectedRoute
            path="/search/:query"
            children={<SearchBreweries />}
          >
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/closest"
          >
            <FindTenClosest />
          </ProtectedRoute>
          <ProtectedRoute
            path="/random"
          >
            <RandomBrewery />
          </ProtectedRoute>
          <ProtectedRoute
            path="/location"
          >
            <LocationPractice isLoaded={isLoaded}/>
          </ProtectedRoute>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <div className="App-main-position">
              <Typography variant="h2" component="h2" align="center">
                404:
              </Typography>
              <Typography variant="h3" component="h3" align="center">
                Page Not Found
              </Typography>
            </div>
          </Route>
        </Switch>
        <Footer />
      </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
