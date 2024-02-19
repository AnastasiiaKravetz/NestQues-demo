import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOffer } from '../actions/offerActions'
import { OFFER_CREATE_RESET } from '../constants/offerConstans'
import { useNavigate } from 'react-router-dom'

function CreateScreen({match, history} ) {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [location, setLocation] = useState('')
    const [isFurnished, setIsFurnished] = useState(false)
    const [numberOfRooms, setNumberOfRooms] = useState(0)
    const [isPetFriendly, setIsPetFriendly] = useState(false)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const offerCreate = useSelector((state) => state.offerCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, offer: createdOffer } = offerCreate

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: OFFER_CREATE_RESET })
            navigate(`/housingoffer/${createdOffer._id}`)
        }
    }, [dispatch, navigate, successCreate, createdOffer])

    
    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('offer_id', offerId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/housingoffers/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('isFurnished', isFurnished);
        formData.append('numberOfRooms', numberOfRooms);
        formData.append('isPetFriendly', isPetFriendly);
        formData.append('description', description);
        formData.append('image', image);

        dispatch(createOffer(formData));
        
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="image">
                <Form.Label className='my-2'>Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleImageChange}
                />
            </Form.Group>
            <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="isFurnished">
                <Form.Check
                    type="checkbox"
                    label="Is Furnished"
                    checked={isFurnished}
                    onChange={(e) => setIsFurnished(e.target.checked)}
                />
            </Form.Group>
            <Form.Group controlId="numberOfRooms">
                <Form.Label>Number of Rooms</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter number of rooms"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="isPetFriendly">
                <Form.Check
                    type="checkbox"
                    label="Is Pet Friendly"
                    checked={isPetFriendly}
                    onChange={(e) => setIsPetFriendly(e.target.checked)}
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreateScreen;
