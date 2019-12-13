import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {login} from '../../actions/auth';

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Card from "@material-ui/core/Card";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        padding: theme.spacing(10, 5, 10, 5),
        margin: theme.spacing(10,70,10,70),
        position: 'relative'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'purple',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: theme.palette.primary
    },
}));

function SignInSide(props) {

    const classes = useStyles();
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const disabled = !(username && password);

    const onSubmit = e => {
        e.preventDefault();
        props.login(username, password);
    };

    const onChangeUsername = e => {
        const {target: {name, value}} = e;
        setUsername(value);
    };
    const onChangePassword = e => {
        const {target: {name, value}} = e;
        setPassword(value);
    };

    if (props.isAuthenticated) {
        return <Redirect to='/optimization'/>;
    }
    return (
            <Paper className={classes.root}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            defaultValue={username}
                            autoFocus
                            onChange={onChangeUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            defaultValue={password}
                            onChange={onChangePassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled = {disabled}
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            Zaloguj
                        </Button>
                    </form>
            </Paper>
    );
}

SignInSide.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(SignInSide);
