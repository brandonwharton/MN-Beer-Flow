import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
// Material-UI components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';






function Nav() {

  const user = useSelector((store) => store.user);
  // state for opening and closing menu
  const [anchorEl, setAnchorEl] = useState(null);

  // click handler for additional nav menu Button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  // closes additional nav menu 
  const handleClose = () => {
    setAnchorEl(null);
  }


  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/myfavorites';
    loginLinkData.text = 'My Favorites';
  }

  return (
    <div className="nav App-nav-position">
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/search">
              Find A Brewery
            </Link>
            <Button
              className="menu-button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon color="error" />
            </Button>
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
        {!user.id &&
          <Link className="navLink" to="/about">
            About
          </Link>
        }
      </div>
    </div>
  );
}

export default Nav;
