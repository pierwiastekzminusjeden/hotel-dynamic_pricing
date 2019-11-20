import {
    ADD_RESERVATION_SUCCESS
} from "./types";

import axios from 'axios';
import {getHeader} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
//get rooms
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

// export const deleteRoom = (id) => (dispatch, getState) => {
//     console.log("hehe");
//     const config = getHeader(getState);

//     axios.delete(`http://localhost:8000/api/rooms/all-rooms/${id}`)
//         .then(res => {
//             dispatch({
//                 type: DELETE_ROOM,
//                 payload: id
//             })
//         }).catch(err => console.log(err));
// };

//registerAdmin
export const addReservation = (room_id, from_date, to_date, price) => (dispatch, getState) => {
    const config = getHeader(getState);

    const body = JSON.stringify({room_id, from_date, to_date, price});
    axios.post('http://localhost:8000/api/reservations',body, config)
        .then(res => {
            dispatch({
                type: ADD_RESERVATION_SUCCESS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};
