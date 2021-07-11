// hooks and components
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
// Material-UI components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';


function Nav() {
  // get user data from reducer to handle conditional rendering of navbar elements
  const user = useSelector((store) => store.user);
  // state for opening and closing menu
  const [anchorEl, setAnchorEl] = useState(null);

  // click handler for the nav menu Button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  // closes nav menu 
  const handleClose = () => {
    setAnchorEl(null);
  }

  // if a user isn't logged in, main link on navbar is login/register
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  // if user is logged in, main link turns into My favorites
  if (user.id != null) {
    loginLinkData.path = '/myfavorites';
    loginLinkData.text = 'My Favorites';
  }


  return (
    <div className="nav App-nav-position">
        {/* Navbar link that is always there but changes whether a user is logged in */}
        <div className="nav-child nav-child-1">
          <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
          </Link>
        </div>
        {/* Navbar links and menu Button that only render if a user is logged in */}
        {user.id && (
          <>
            {/* Links that are in the main nav bar */}
            <div className="nav-child nav-child-2">
              <Link className="navLink" to="/search">
                Find A Brewery
              </Link> 
            </div>
            {/* Menu button link and all it's children */}
            <div className="nav-child nav-child-3">
              <Button
                className="menu-button"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon color="error" />
              </Button>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link className="navLink-menu" to="/closest">
                  See What's Close
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="navLink-menu" to="/random">
                  Go With the Flow
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="navLink-menu" to="/mycomments">
                  My Comments
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="navLink-menu" to="/about">
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LogOutButton className="navLink-menu" />
              </MenuItem>
            </Menu>
          </>
        )}
        {/* If no user is logged in, display the About page link instead */}
        {!user.id &&
          <div className="nav-child nav-child-4">
            <Link className="navLink" to="/about">
              About
            </Link>
          </div>
        }
      
    </div>
  );
}

export default Nav;
