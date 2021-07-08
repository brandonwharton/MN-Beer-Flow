import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
// provided boilerplate components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
// my components
import Header from '../Header/Header';
import MyFavoritesList from '../MyFavoritesList/MyFavoritesList';
import MyCommentsList from '../MyCommentsList/MyCommentsList';
import BreweryDetails from '../BreweryDetails/BreweryDetails';
import SearchBreweries from '../SearchBreweries/SearchBreweries';
import RandomBrewery from '../RandomBrewery/RandomBrewery';
import GetUserLocation from '../GetUserLocation/GetUserLocation';
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






function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
      <div>
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
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows MyFavorites page else shows LoginPage
            exact
            path="/myfavorites"
          >
            <MyFavoritesList />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
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

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/myfavorites"
          >
            <LandingPage />
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
            path="/random"
          >
            <RandomBrewery />
          </ProtectedRoute>
          <ProtectedRoute
            path="/location"
          >
            <GetUserLocation />
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
