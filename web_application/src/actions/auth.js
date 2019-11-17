import axios from 'axios';
import { stopSubmit } from 'redux-form';

import {
    USER_LOADING,
    USER_LOADED,

    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS, CHANGE_PASSWORD_SUCCESS, REGISTER_USER_SUCCESS
} from './types';

// LOAD USER check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const config = getHeader(getState);


    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(error => {
        dispatch({
            type: AUTH_ERROR,
        });
    });
};

//change password
export const changePassword = (current_passwd, new_passwd) => (dispatch, getState) => {

    const config = getHeader(getState);

    const body = JSON.stringify({current_passwd, new_passwd});
    console.log(config);
    axios.post('/api/auth/change-password',body, config)
        .then(res => {
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
                payload: res.data
            });
        }).catch(error => {
        dispatch({
            type: AUTH_ERROR,
        });
    });
};
//login
export const login = (username, password) => dispatch=> {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request
    const body = JSON.stringify({username, password});

    axios.post('/api/auth/login',body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(error => {
        dispatch({
            type: LOGIN_FAIL,
        });
    });
};

//registerAdmin
export const registerAdmin = (username, email, password) => (dispatch, getState) => {

    const config = getHeader(getState);

    const body = JSON.stringify({username, email, password});
    console.log(config);
    axios.post('/api/auth/register-admin',body, config)
        .then(res => {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: res.data
            });
        }).catch(error => {
        dispatch({
            type: AUTH_ERROR,
        });
    });
};

// Logout
export const logout = () => (dispatch, getState) => {

    const config = getHeader(getState);

    axios.get('/api/auth/logout', null,  config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            });
        }).catch(error => {
        dispatch({
            type: LOGIN_FAIL,
        });
    });
};


export const getHeader = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token;
    }
    return config;
};