import axios from 'axios'

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

export const listRequests = () => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/housingrequests/myrequests/`, config);

        dispatch({
            type: REQUEST_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: REQUEST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const listRequestDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/housingrequests/${id}`)

        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REQUEST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.request,
        })
    }
}

export const createRequest = (housing_offer_data) => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { requestdata } = await axios.post(
            '/api/housingrequests/create/',
            housing_offer_data, 
            config
        )


        dispatch({
            type: REQUEST_CREATE_SUCCESS,
            payload: requestdata,
        });

        

       



    } catch (error) {
        dispatch({
            type: REQUEST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.request,
        });
    }

};


export const deleteRequest = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/housingrequests/delete/${id}/`, config);

        dispatch({ type: REQUEST_DELETE_SUCCESS });

        // Dispatch an action to fetch updated requests after deletion if needed
        // dispatch(listRequests());
    } catch (error) {
        dispatch({
            type: REQUEST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};


