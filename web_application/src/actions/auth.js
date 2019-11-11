import axios from 'axios';
import { stopSubmit } from 'redux-form';

import {
  USER_LOADING,
  USER_LOADED,

  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';

// LOAD USER check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const token = getState().auth.token;
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token;
    }

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

//login
export const login = (username, password) => dispatch=> {
    //headers
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