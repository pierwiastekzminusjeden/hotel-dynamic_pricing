import {ADD_ROOM_SUCCESS, DELETE_ROOM, GET_ROOMS} from "../actions/types";

const initialState = {
    rooms: []
};


export default function(state = initialState, action) {
    switch(action.type){
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            };
        case ADD_ROOM_SUCCESS:
            return {
                ...state,
                rooms: [...state.rooms, action.payload]
            };
            case DELETE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter((room) => room.room_id !== action.payload)
            };
        default:
            return state;
    }
}