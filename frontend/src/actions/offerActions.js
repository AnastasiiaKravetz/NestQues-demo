import axios from 'axios'

import {
    OFFER_LIST_REQUEST,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL
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
<<<<<<< Updated upstream
=======
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

export const createOffer = (title, images, price, location, isFurnished, numberOfRooms, isPetFriendly, description) => async (dispatch, getState) => {
    try {
        dispatch({ type: OFFER_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('is_furnished', isFurnished.toString());
        formData.append('number_of_rooms', numberOfRooms);
        formData.append('is_pet_friendly', isPetFriendly.toString());
        formData.append('description', description);
        images.forEach(image => {
            formData.append('images', image);
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(
            '/api/housingoffers/create/',
            formData,
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
>>>>>>> Stashed changes
}