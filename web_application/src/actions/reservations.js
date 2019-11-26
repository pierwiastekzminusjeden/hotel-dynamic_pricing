import {
    ADD_RESERVATION_SUCCESS
} from "./types";

import axios from 'axios';
import {getHeader} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const getReservations = () => (dispatch, getState) => {
    const config = getHeader(getState);

    axios.get('http://localhost:8000/api/reservations', config)
        .then(res => {
            dispatch({
                type: GET_ROOMS,
                payload: res.data
            })
        }).catch(err => console.log(err));
};


export const addReservation = (room, client, from_date, to_date, price, pricesPerDay) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({room, client, from_date, to_date, price, pricesPerDay});
    axios.post('http://localhost:8000/api/reservations',body, config)
        .then(res => {
            dispatch({
                type: ADD_RESERVATION_SUCCESS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};
