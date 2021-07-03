import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
// Material-UI components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

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
    <div className="nav">
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/search">
              Search
            </Link>
            <Button 
              aria-controls="simple-menu"
              aria-hasopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link className="navLink" to="/mycomments">
                  My Comments
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="navLink" to="/about">
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LogOutButton className="navLink" />
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
