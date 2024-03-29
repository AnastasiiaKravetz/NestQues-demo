import axios from 'axios'

import {
    OFFER_LIST_REQUEST,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL,

    OFFER_DETAILS_REQUEST,
    OFFER_DETAILS_SUCCESS,
    OFFER_DETAILS_FAIL,

    OFFER_CREATE_SUCCESS,
    OFFER_CREATE_REQUEST,
    OFFER_CREATE_FAIL,

    OFFER_DELETE_REQUEST,
    OFFER_DELETE_SUCCESS,
    OFFER_DELETE_FAIL,

    OFFER_UPDATE_REQUEST,
    OFFER_UPDATE_SUCCESS,
    OFFER_UPDATE_FAIL,

} from '../constants/offerConstans'

export const listOffers = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: OFFER_LIST_REQUEST })

        const { data } = await axios.get(`/api/housingoffers${keyword}`)

        dispatch({
            type: OFFER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: OFFER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listOfferDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: OFFER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/housingoffers/${id}`)
        console.log(data)
        dispatch({
            type: OFFER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: OFFER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createOffer = (title, images, price, location, isFurnished, numberOfRooms, isPetFriendly, description) => async (dispatch, getState) => {
    try {
        dispatch({ type: OFFER_CREATE_REQUEST });

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
            '/api/housingoffers/create/',
            { title, images, price, location, isFurnished, numberOfRooms, isPetFriendly, description },
            config
        );

        dispatch({
            type: OFFER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: OFFER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteOffer = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_DELETE_REQUEST
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
            `/api/housingoffers/delete/${id}/`,
            config
        )

        dispatch({
            type: OFFER_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: OFFER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateOffer = (offer) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/housingoffers/update/${offer._id}/`,
            offer,
            config
        )
        dispatch({
            type: OFFER_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: OFFER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: OFFER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}