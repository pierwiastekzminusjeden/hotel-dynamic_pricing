import {
    GET_AVAILABLE_ROOMS
} from "../actions/types";

const initialState = {
    roomId: null,
    pricingData: null
};

export default function(state = initialState, action) {
    switch(action.type){
        case GET_AVAILABLE_ROOMS:
            console.log("hehe")
            return {
                ...state,
                roomId: action.payload.room,
                pricingData: action.payload.price
            };
        default:
            return state;
    }
}