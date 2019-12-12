import {} from "../actions/types";
import {ADD_PRICE_SUCCESS} from "../actions/types";
import {GET_PRICES} from "../actions/types";
import {DELETE_PRICE} from "../actions/types";

const initialState = {
    prices: []
};

export default function(state = initialState, action) {
    switch(action.type){
        // case ADD_PRICE_SUCCESS:
        //     return {
        //         ...state,
        //         prices: [...state.prices, action.payload]
        //     };
        // case GET_PRICES:
        //     return {
        //         ...state,
        //         prices: action.payload
        //     };
        // case DELETE_PRICE:
        //     return {
        //         ...state,
        //         prices: state.prices.filter((price) => price.date !== action.payload)
        //     };
        default:
            return state;
    }
}