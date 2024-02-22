import {
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAIL,

    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,

    REQUEST_CREATE_SUCCESS,
    REQUEST_CREATE_REQUEST,
    REQUEST_CREATE_FAIL,
    REQUEST_CREATE_RESET,

    REQUEST_DELETE_REQUEST,
    REQUEST_DELETE_SUCCESS,
    REQUEST_DELETE_FAIL,

} from '../constants/requestConstants'


export const requestListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case REQUEST_LIST_REQUEST:
            return { loading: true, requests: [] }

        case REQUEST_LIST_SUCCESS:
            return {
                loading: false,
                requests: action.payload.requests,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case REQUEST_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const requestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case REQUEST_DETAILS_REQUEST:
            return { loading: true, ...state }

        case REQUEST_DETAILS_SUCCESS:
            return {
                loading: false,
                request: action.payload,
            }

        case REQUEST_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const requestCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_CREATE_REQUEST:
            return { loading: true }

        case REQUEST_CREATE_SUCCESS:
            return { loading: false, success: true, request: action.payload }

        case REQUEST_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case REQUEST_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const requestDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_DELETE_REQUEST:
            return { loading: true }

        case REQUEST_DELETE_SUCCESS:
            return { loading: false, success: true }

        case REQUEST_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

