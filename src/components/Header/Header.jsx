import './Header.css';
// Material-UI components
import Typography from '@material-ui/core/Typography';

// header for across the app
function Header() {

    return (
        <header className="header App-header-position">
            <Typography  variant="h3" component="h3">
                MN Beer Flow
            </Typography>
        </header>
    )
}

export default Header;