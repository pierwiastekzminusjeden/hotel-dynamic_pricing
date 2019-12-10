import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {registerAdmin} from "../../actions/auth";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import store from "../../store";
import {GET_ERRORS} from "../../actions/types";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        marginTop: '70px',
        marginBottom: '70px'
    },

    paper: {
        padding: theme.spacing(3, 1, 2, 1),
        margin: theme.spacing(10, 50, 10, 50),
        position: 'relative'
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

function RegisterAdminForm(props) {

    const classes = useStyles();
    const [username, setUsername] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();
    const disabled = !(username && email && password && password === confirmPassword);

    const onSubmit = e => {
        e.preventDefault();
        props.registerAdmin(username, email, password);
    };

    const onChangeUsername = e => {
        const {target: {name, value}} = e;
        setUsername(value);
    };
    const onChangeEmail = e => {
        const {target: {name, value}} = e;
        setEmail(value);
    };

    const onChangePassword = e => {
        const {target: {name, value}} = e;
        setPassword(value);
    };
    const onChangeConfirmPassword = e => {
            const {target: {name, value}} = e;
            setConfirmPassword(value);
            if (password !== confirmPassword) {
                const errors = {
                    message: 'Hasła nie są identyczne',
                    status: -1
                };
                store.dispatch({
                    type: GET_ERRORS,
                    payload: errors
                });
            }
        }
    ;

    return (
        <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.text}>Dodaj nowego użytkownika</Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nazwa użytkownika"
                    defaultValue={username}
                    autoFocus
                    onChange={onChangeUsername}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
                    defaultValue={email}
                    onChange={onChangeEmail}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Hasło"
                    type="password"
                    defaultValue={password}
                    onChange={onChangeConfirmPassword}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Potwierdź hasło"
                    type="password"
                    defaultValue={confirmPassword}
                    onChange={onChangePassword}
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
                    Dodaj administratora
                </Button>
            </form>
        </Paper>
    );
}

RegisterAdminForm.propTypes = {
    auth: PropTypes.object.isRequired,
    registerAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {registerAdmin})(RegisterAdminForm);
