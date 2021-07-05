import './Header.css';
// Material-UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// header for across the app
function Header() {

    return (
        <header>
            

            <Typography className="header App-header-position" variant="h3" component="h3">
                MN Beer Flow
            </Typography>


        </header>
    )
}

export default Header;