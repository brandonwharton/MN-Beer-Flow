import './Header.css';
// Material-UI components
import Typography from '@material-ui/core/Typography';
// header for across the app
function Header() {

    return (
        <Typography className="App-header" variant="h3" component="h3">
            Project Name
        </Typography>
    )
}

export default Header;