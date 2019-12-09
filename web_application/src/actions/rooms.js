import {ADD_ROOM_SUCCESS, DELETE_ROOM, GET_ERRORS, GET_ROOMS} from "./types";

import axios from 'axios';
import {getHeader} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
//get rooms
export const getRooms = () => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.get('http://localhost:8000/api/rooms/', config)
        .then(res => {
            dispatch({
                type: GET_ROOMS,
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

export const deleteRoom = (id) => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.delete(`http://localhost:8000/api/room/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_ROOM,
                payload: id
            })
        }).catch(err => {
        const errors = {
            message: err.response.data,
            status: err.response.status
        };
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })};


//registerAdmin
export const addRoom = (room_number, room_type, base_price_per_night, image_path) => (dispatch, getState) => {
    const config = getHeader(getState);

    const body = JSON.stringify({room_number, room_type, base_price_per_night, image_path});
    axios.post('http://localhost:8000/api/rooms/',body, config)
        .then(res => {
            dispatch({
                type: ADD_ROOM_SUCCESS,
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

export const getAvailableRooms = (room_type, date_from, date_to) => (dispatch) => {
    date_from = date_from.format()
    // const config = getHeader(getState);
    params = `?q=${room_type}&q2=${date_from}&q3=${date_to}`
    axios.get('http://localhost:8000/api/free-rooms/' + params)
        .then(res => {
            dispatch({
                type: GET_ROOMS,
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

