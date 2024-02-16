import axios from 'axios'

import {
    OFFER_LIST_REQUEST,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL,

    OFFER_DETAILS_REQUEST,
    OFFER_DETAILS_SUCCESS,
    OFFER_DETAILS_FAIL
} from '../constants/offerConstans'

export const listOffers = () => async (dispatch) => {
    try {
        dispatch({ type: OFFER_LIST_REQUEST })

        const { data } = await axios.get(`/api/housingoffers/`)

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