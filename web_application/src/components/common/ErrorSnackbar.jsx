import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5)
    },
}));

function ErrorSnackbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        const errorMessage = props.errorMessage;
        setError(errorMessage);
        if(props.errorMessage !== null)
            setOpen(true);
    }, [props.serverResponseStatus, props.serverMessage, props.errorMessage]);

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
    errorMessage: PropTypes.object.isRequired,
    serverResponseStatus: PropTypes.object.isRequired,
    serverMessage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errorMessage: state.errors.errorMessage,
    serverResponseStatus: state.errors.serverResponseStatus,
    serverMessage: state.errors.serverMessage
});

export default connect(mapStateToProps, {})(ErrorSnackbar);