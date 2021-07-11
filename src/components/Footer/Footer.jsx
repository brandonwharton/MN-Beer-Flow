import React from 'react';
import './Footer.css';
// Material-UI components
import Typography from '@material-ui/core/Typography';

// footer for use across the app
function Footer() {
  return (
    <footer className="App-footer-position">
      <Typography variant="body2" component="p">
        &copy; MN Beer Flow v1.0
      </Typography>
    </footer>
  )
}

export default Footer;
