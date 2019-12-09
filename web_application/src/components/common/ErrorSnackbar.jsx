import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

function ErrorSnackbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {

        console.log(props.message);
        const errorMessage = 'Error ' + props.status + ': ' +JSON.stringify(props.message, undefined, 2);
        setError(errorMessage);
        if(props.status !== null)
            setOpen(true);
    }, [props.status, props.message]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={error}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}


ErrorSnackbar.propTypes = {
    message: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    message: state.errors.message,
    status: state.errors.status
});

export default connect(mapStateToProps, {})(ErrorSnackbar);