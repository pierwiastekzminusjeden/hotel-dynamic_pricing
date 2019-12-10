import auth from './auth';
import rooms from './rooms';
import availableRooms from './availableRooms';
import reservations from './reservations';
import errors from './errors';
import {combineReducers} from "redux";
import prices from "./prices";

export default combineReducers({
    auth,
    rooms,
    availableRooms,
    reservations,
    prices,
    errors
});