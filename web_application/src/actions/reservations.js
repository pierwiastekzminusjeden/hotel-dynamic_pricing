import {ADD_RESERVATION_SUCCESS, DELETE_RESERVATION, DELETE_ROOM, GET_ERRORS, GET_RESERVATION} from "./types";

import axios from 'axios';
import {getHeader} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const getReservations = () => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.get('http://localhost:8000/api/reservations', config)
        .then(res => {
            dispatch({
                type: GET_RESERVATION,
                payload: res.data
            })
        }).catch(err =>{
        const errors = {
            message: err.response.data,
            status: err.response.status
        };
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })};

export const deleteReservation = (id) => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.delete(`http://localhost:8000/api/reservation/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_RESERVATION,
                payload: id
            })
        }).catch(err =>{
        const errors = {
            message: err.response.data,
            status: err.response.status
        };
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })};

export const addReservation = (room, client, from_date, to_date, price, pricesPerDay) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({room, client, from_date, to_date, price, pricesPerDay});
    axios.post('http://localhost:8000/api/reservations',body, config)
        .then(res => {
            dispatch({
                type: ADD_RESERVATION_SUCCESS,
                payload: res.data
            });
        }).catch(err =>{
        const errors = {
            message: err.response.data,
            status: err.response.status
        };
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })};
