import {
    ADD_PRICE_SUCCESS,
    DELETE_PRICE,
    GET_ERRORS,
    GET_PRICES,
} from "./types";

import axios from 'axios';
import {getHeader} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const getPrices = () => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.get('http://localhost:8000/api/prices', config)
        .then(res => {
            dispatch({
                type: GET_PRICES,
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

export const deletePrice = (id) => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.delete(`http://localhost:8000/api/price/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_PRICE,
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

export const addPrice = (date, price) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(date, price);
    axios.post('http://localhost:8000/api/prices',body, config)
        .then(res => {
            dispatch({
                type: ADD_PRICE_SUCCESS,
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
