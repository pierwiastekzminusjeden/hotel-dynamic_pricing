import auth from './auth';
import rooms from './rooms';
import {combineReducers} from "redux";

export default combineReducers({
    auth,
    rooms
});