import auth from './auth';
import rooms from './rooms';
import availableRooms from './availableRooms';
import reservations from './reservations';
import {combineReducers} from "redux";

export default combineReducers({
    auth,
    rooms,
    availableRooms,
    reservations
});