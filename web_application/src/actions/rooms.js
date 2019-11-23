import {
    GET_ROOMS,
    DELETE_ROOM, REGISTER_USER_SUCCESS, AUTH_ERROR, ADD_ROOM_SUCCESS
} from "./types";

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
        }).catch(err => console.log(err));
};

export const deleteRoom = (id) => (dispatch, getState) => {
    console.log("hehe");
    const config = getHeader(getState);

    axios.delete(`http://localhost:8000/api/room/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_ROOM,
                payload: id
            })
        }).catch(err => console.log(err));
};

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
        }).catch(err => console.log(err));
};

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
        }).catch(err => console.log(err));
};

