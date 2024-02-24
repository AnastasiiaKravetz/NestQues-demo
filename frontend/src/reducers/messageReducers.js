import {
    MESSAGE_LIST_REQUEST,
    MESSAGE_LIST_SUCCESS,
    MESSAGE_LIST_FAIL,

    MESSAGE_DETAILS_REQUEST,
    MESSAGE_DETAILS_SUCCESS,
    MESSAGE_DETAILS_FAIL,

    MESSAGE_CREATE_SUCCESS,
    MESSAGE_CREATE_REQUEST,
    MESSAGE_CREATE_FAIL,
    MESSAGE_CREATE_RESET,

    MESSAGE_DELETE_REQUEST,
    MESSAGE_DELETE_SUCCESS,
    MESSAGE_DELETE_FAIL,

    MESSAGES_DELETE_REQUEST,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_DELETE_FAIL,

} from '../constants/messageConstans'


export const messageListReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case MESSAGE_LIST_REQUEST:
            return { loading: true, messages: [] }

        case MESSAGE_LIST_SUCCESS:
            return {
                loading: false,
                messages: action.payload,
            }

        case MESSAGE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const messageDetailsReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case MESSAGE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case MESSAGE_DETAILS_SUCCESS:
            return {
                loading: false,
                message: action.payload,
            }

        case MESSAGE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const messageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_CREATE_REQUEST:
            return { loading: true }

        case MESSAGE_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }

        case MESSAGE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case MESSAGE_CREATE_RESET:
            return {    }

        default:
            return state
    }
}

export const messageDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_DELETE_REQUEST:
            return { loading: true }

        case MESSAGE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case MESSAGE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const messagesDeleteReducer = (state = { loading: false, success: false, error: null }, action) => {
    switch (action.type) {
        case MESSAGES_DELETE_REQUEST:
            return { loading: true, success: false, error: null };
        case MESSAGES_DELETE_SUCCESS:
            return { loading: false, success: true, error: null };
        case MESSAGES_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};