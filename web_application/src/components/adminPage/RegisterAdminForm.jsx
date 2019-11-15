import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changePassword} from '../../actions/auth';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        marginTop: '70px',
        marginBottom: '70px'
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

function RegisterAdminForm(props) {

    const classes = useStyles();
    const [username, setUsername] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

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
        if(password !== value){
            return <div>error, passwords are not same</div>;
        }
    };

    return (
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
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
                            id="email"
                            defaultValue={email}
                            onChange={onChangeEmail}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="password"
                            type="password"
                            id="password"
                            defaultValue={password}
                            onChange={onChangeConfirmPassword}
                        />
                         <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="confirmPassword"
                            type="password"
                            id="ConfirmPassword"
                            onChange={onChangePassword}
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
                    </form>
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
