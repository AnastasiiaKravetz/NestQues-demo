import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOfferDetails } from '../actions/offerActions';
import { useParams, useNavigate } from "react-router-dom";
import { createMessage } from '../actions/messageAction';
import { createRequest } from '../actions/requestActions';
import { MESSAGE_CREATE_RESET } from '../constants/messageConstans';
import { REQUEST_CREATE_RESET } from '../constants/requestConstants';

function OfferScreen() {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [requestId, setRequestId] = useState(null); 

    const offerDetails = useSelector((state) => state.offerDetails);
    const { loading, error, offer } = offerDetails;

    const messageCreate = useSelector((state) => state.messageCreate);
    const { success: successMessageCreate } = messageCreate;

    const requestCreate = useSelector((state) => state.requestCreate);
    const { success: successRequestCreate, request: createdRequest } = requestCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigate = useNavigate();

    useEffect(() => {
        if (successMessageCreate) {
            dispatch({ type: MESSAGE_CREATE_RESET });
            navigate(`/`);
        }

        if (successRequestCreate && createdRequest) {
            // If successful, set the request ID
            setRequestId(createdRequest._id);
        }
    }, [dispatch, navigate, successMessageCreate, successRequestCreate, createdRequest]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the content field is empty
        if (!content) {
            // Display an error message or handle the case where content is empty
            return;
        }

        // Dispatch the createRequest action
        dispatch(createRequest({
            housing_offer: offer._id, 
            user: userInfo._id
        }));
        
        // Dispatch the createMessage action when the request creation was successful and a request was created
        if (successRequestCreate && createdRequest) {
            dispatch(createMessage(content, createdRequest._id));
        }
    };

    const params = useParams();
    useEffect(() => {
        dispatch(listOfferDetails(params.id));
    }, [dispatch, params]);

    return (
        <div>
            <Link to='/' className='btn btn-light my-4'>Go Back</Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={offer.image} alt={offer.name} fluid />
                    </Col>
                    <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{offer.titel}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${offer.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Rooms: {offer.number_of_rooms}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {offer.description}
                            </ListGroup.Item>
                            <ListGroup.Item >
                                Furnished: {offer.is_furnished ? "Yes" : "No"}
                            </ListGroup.Item>
                            <ListGroup.Item >
                                Pet friendly: {offer.is_pet_friendly ? "Yes" : "No"}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Location: {offer.location}
                            </ListGroup.Item>
                        </ListGroup>
                        <Form onSubmit={handleSubmit} className='my-4'>
                            <Form.Group controlId='message'>
                                <Form.Label>Message:</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows='3'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}
            {successMessageCreate && <Message variant='success'>Message submitted successfully!</Message>}
        </div>
    );
}

export default OfferScreen;