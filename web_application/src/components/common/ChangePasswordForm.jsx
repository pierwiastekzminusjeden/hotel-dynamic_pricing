import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changePassword} from '../../actions/auth';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";


const useStyles = makeStyles(theme => ({

    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        padding: theme.spacing(3, 1, 2, 1),
        margin: theme.spacing(10,50,10,50),
        position: 'relative'
    },
    text: {
        marginTop: theme.spacing(1),
        marginBottm: theme.spacing(1),
        textAlign: 'center'
    },
}));

function ChangePasswordForm(props) {
    const classes = useStyles();
    const [currentPassword, setCurrentPassword] = React.useState();
    const [newPassword, setNewPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();

    const disabled = !(currentPassword && newPassword && newPassword === confirmPassword);

    const onSubmit = e => {
        e.preventDefault();
        props.changePassword(currentPassword, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const onChangeCurrentPassword = e => {
        const {target: {name, value}} = e;
        setCurrentPassword(value);
    };
    const onChangeNewPassword = e => {
        const {target: {name, value}} = e;
        setNewPassword(value);
    };
    const onChangeConfirmPassword = e => {
        const {target: {name, value}} = e;
        setConfirmPassword(value);
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant = "h3" className={classes.text}> Change password</Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="current password"
                    type="password"
                    defaultValue={currentPassword}
                    onChange={onChangeCurrentPassword}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    type="password"
                    label="new password"
                    defaultValue={newPassword}
                    onChange={onChangeNewPassword}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    type="password"
                    label="new password"
                    defaultValue={confirmPassword}
                    onChange={onChangeConfirmPassword}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    className={classes.submit}
                    onClick={onSubmit}
                >
                    Change Password
                </Button>
            </form>
        </Paper>
    );
}

ChangePasswordForm.propTypes = {
    auth: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {changePassword})(ChangePasswordForm);
