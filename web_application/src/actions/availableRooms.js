import {GET_AVAILABLE_ROOMS, GET_ERRORS} from "./types";

import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const requestAvailableRooms = (room_type, from_date, to_date) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // date_from = date_from.format()
    const body = JSON.stringify({room_type, from_date, to_date});
    axios.post('http://localhost:8000/api/available-room/', body, config)
        .then(res => {
            dispatch({
                type: GET_AVAILABLE_ROOMS,
                payload: res.data
            });
            console.log(res.data)
        }).catch(err =>{
            const errors = {
                message: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
    });
};
