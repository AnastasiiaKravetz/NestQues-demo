import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listOfferDetails, updateOffer } from '../actions/offerActions';
import { OFFER_UPDATE_RESET } from '../constants/offerConstans'; 
import { useParams } from 'react-router-dom';


function OfferEditScreen({ }) {
    const { id } = useParams()
    const offerId = id
    let navigate = useNavigate()

    console.log(id)
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [isFurnished, setIsFurnished] = useState(false);
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [isPetFriendly, setIsPetFriendly] = useState(false);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false)
    

    const dispatch = useDispatch();

    const offerDetails = useSelector(state => state.offerDetails);
    const { error, loading, offer } = offerDetails;

    const offerUpdate = useSelector(state => state.offerUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = offerUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: OFFER_UPDATE_RESET });
            navigate('/offerlist')
        } else {
            if (!offer || !offer.title || offer._id !== Number(offerId)) {
                dispatch(listOfferDetails(offerId));
            } else {
                setTitle(offer.title)
                setPrice(offer.price)
                setImage(offer.image)
                setLocation(offer.location)
                setDescription(offer.description)
                setIsFurnished(offer.is_furnished)
                setNumberOfRooms(offer.number_of_rooms)
                setIsPetFriendly(offer.is_pet_friendly)
                
            }
        }
    }, [dispatch, offer, offerId, navigate, successUpdate]);
    

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateOffer({
            _id: offerId,
            title,
            image,
            price,
            is_furnished: isFurnished,
            is_pet_friendly: isPetFriendly,
            location,
            number_of_rooms:numberOfRooms,
            description,
        }));
    };

    const uploadFileHandler = async (e) => {
        const files = e.target.files
        const formData = new FormData()

        formData.append('images', files)
        formData.append('offer_id', offerId)
        for (let i = 0 ; i < files.length ; i++) {
            formData.append("images", files[i]);
        }

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

    return (
        <div>
            <Link to='/offerlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Offer</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label className='my-2'>Images</Form.Label>
                                <Form.Control
                                    type="file" multiple onChange={uploadFileHandler} 
                                />
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='location'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='isPetFriendly'>
                                <Form.Check
                                    type="checkbox"
                                    label="Is Pet Friendly"
                                    checked={isPetFriendly}
                                    onChange={(e) => setIsPetFriendly(e.target.checked)}
                                />
                            </Form.Group>

                            <Form.Group controlId='isFurnished'>
                                <Form.Check
                                    type="checkbox"
                                    label="Is Furnished"
                                    checked={isFurnished}
                                    onChange={(e) => setIsFurnished(e.target.checked)}
                                />
                            </Form.Group>


                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>
    );
}

export default OfferEditScreen;
