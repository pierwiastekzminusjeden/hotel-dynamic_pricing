import {
    ADD_RESERVATION_SUCCESS
} from "../actions/types";

const initialState = {
    roomId: 0,
    pricingData: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case ADD_RESERVATION_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
}