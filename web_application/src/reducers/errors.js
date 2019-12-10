import {GET_ERRORS} from "../actions/types";

const initialState = {
    message: {},
    status: null,
    errorMessage: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return {
                serverMessage: action.payload.message,
                serverResponseStatus: action.payload.status,
                errorMessage: buildMessage(action.payload.message, action.payload.status)
            };
        default:
            return state;
    }
};

function buildMessage(message, status) {
    let errorMessage = '';
    if(status > 0) {
        errorMessage = 'Error ' + status + ':';
        let messageInfo = '';
        if(status === 500){
            messageInfo += 'Internal server error';
        }
        else {
            for (let property in message) {
                messageInfo += property + ': ' + message[property] + '/n';
            }
        }
        errorMessage += messageInfo;
    }
    if(status < 0) {
        errorMessage = message;
    }
    return errorMessage;
};