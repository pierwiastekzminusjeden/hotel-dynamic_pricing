import {ADD_RESERVATION_SUCCESS, DELETE_RESERVATION, DELETE_ROOM, GET_RESERVATION} from "../actions/types";

const initialState = {
    reservations: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case ADD_RESERVATION_SUCCESS:
            return {
                ...state,
                reservations: [...state.reservations, action.payload]
            };
        case GET_RESERVATION:
            return {
                ...state,
                reservations: action.payload
            };
        case DELETE_RESERVATION:
            return {
                ...state,
                reservations: state.reservations.filter((reservation) => reservation.reservation_id !== action.payload)
            };
        default:
            return state;
    }
}