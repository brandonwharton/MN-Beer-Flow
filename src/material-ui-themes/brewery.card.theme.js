import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    control: {
        padding: theme.spacing(2),
    },
    card: {
        marginTop: '20px',
        backgroundColor: '#cbcbc9',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
}));