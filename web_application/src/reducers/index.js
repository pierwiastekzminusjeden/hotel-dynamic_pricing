import auth from './auth';
import rooms from './rooms';
import availableRooms from './availableRooms';
import reservations from './reservations';
import errors from './errors';
import {combineReducers} from "redux";

export default combineReducers({
    auth,
    rooms,
    availableRooms,
    reservations,
    errors
});