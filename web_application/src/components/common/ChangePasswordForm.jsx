import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changePassword} from '../../actions/auth';

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        marginTop: '70px',
        marginBottom: '70px'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
}));

function ChangePasswordForm(props) {

    const classes = useStyles();
    const [currentPassword, setCurrentPassword] = React.useState();
    const [newPassword, setNewPassword] = React.useState();

    const onSubmit = e => {
        e.preventDefault();
        props.changePassword(currentPassword, newPassword);
    };

    const onChangeCurrentPassword = e => {
        const {target: {name, value}} = e;
        setCurrentPassword(value);
    };
    const onChangeNewPassword = e => {
        const {target: {name, value}} = e;
        setNewPassword(value);
    };

    return (
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="currentPassword"
                            label="CurrentPassword"
                            name="currentPassword"
                            autoComplete="currentPassword"
                            defaultValue={currentPassword}
                            autoFocus
                            onChange={onChangeCurrentPassword}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="newPassword"
                            type="newPassword"
                            id="newPassword"
                            autoComplete="current-password"
                            defaultValue={newPassword}
                            onChange={onChangeNewPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            ChangePassword
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
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
