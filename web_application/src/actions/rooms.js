import {
    GET_ROOMS,
    DELETE_ROOM, REGISTER_USER_SUCCESS, AUTH_ERROR, ADD_ROOM_SUCCESS
} from "./types";

import axios from 'axios';
import {getHeader} from "./auth";


//get rooms
export const getRooms = () => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.get('/api/rooms/all-rooms', config)
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

    axios.delete(`/api/rooms/all-rooms/${id}`)
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
    axios.post('/api/rooms/all-rooms',body, config)
        .then(res => {
            dispatch({
                type: ADD_ROOM_SUCCESS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};
