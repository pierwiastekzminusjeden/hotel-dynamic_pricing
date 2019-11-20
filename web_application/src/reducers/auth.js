import {
    AUTH_ERROR,
    CHANGE_PASSWORD_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from '../actions/types';

const initialState = {
    token: window.localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        // case CHANGE_PASSWORD_SUCCESS: // to psuje
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         isLoading: false,
        //         user: action.payload
        //     };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            console.log("hehe")
            localStorage.setItem('token', action.payload.token);
             console.log(window.localStorage.getItem('token'))
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };

        default:
            return state;
    }
}
