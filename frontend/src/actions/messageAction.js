import axios from 'axios'

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

export const listMessages = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESSAGE_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.get(`/api/housingrequests/${id}/chat`,config);
        dispatch({
            type: MESSAGE_LIST_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: MESSAGE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMessageDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MESSAGE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/messages/${id}`)

        dispatch({
            type: MESSAGE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createMessage = (content, requestId) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESSAGE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(
            '/api/messages/create/',
            { content, request_id: requestId },
            config
        );

        dispatch({
            type: MESSAGE_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MESSAGE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteMessage = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/messages/delete/${id}/`,
            config
        )

        dispatch({
            type: MESSAGE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: MESSAGE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteMessagesByRequestId = (requestId) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESSAGES_DELETE_REQUEST });

        
        await axios.delete(`/api/messages/deleteByRequestId/${requestId}`);

        
        dispatch({ type: MESSAGES_DELETE_SUCCESS });
    } catch (error) {
        
        dispatch({ type: MESSAGES_DELETE_FAIL, payload: error.message });
    }
};