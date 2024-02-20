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
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const {userInfo}= useSelector(state => state.userLogin)

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

    
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('is_furnished', isFurnished);
        formData.append('number_of_rooms', numberOfRooms);
        formData.append('is_pet_friendly', isPetFriendly);
        formData.append('description', description);
        formData.append('image', file);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                     Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post('/api/housingoffers/create/', formData, config)

        } catch (error) {
            console.log('Error')
        }

        
    }

    

    return (
        <Form onSubmit={submitHandler} className=' my-2'>
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
                    type="file" onChange={handleFileChange} 
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
            
            <Form.Group controlId="numberOfRooms">
                <Form.Label>Number of Rooms</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter number of rooms"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="isPetFriendly" className='my-2'>
                <Form.Check
                    type="checkbox"
                    label="Is Pet Friendly"
                    checked={isPetFriendly}
                    onChange={(e) => setIsPetFriendly(e.target.checked)}
                />
            </Form.Group>
            <Form.Group controlId="isFurnished" className='my-2'>
                <Form.Check
                    type="checkbox"
                    label="Is Furnished"
                    checked={isFurnished}
                    onChange={(e) => setIsFurnished(e.target.checked)}
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
            <Button variant="primary" type="submit" className='my-2'>
                Submit
            </Button>
        </Form>
    );
}

export default CreateScreen;
