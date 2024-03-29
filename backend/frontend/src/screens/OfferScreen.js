import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Form, Button, Carousel } from 'react-bootstrap';
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
    const [messageCreated, setmessageCreated] = useState(false);

    const offerDetails = useSelector((state) => state.offerDetails);
    const { loading, error, offer } = offerDetails;

    const requestList = useSelector(state => state.requestList);
    const { loadingReq, errorReq, requests } = requestList;

    const messageCreate = useSelector((state) => state.messageCreate);
    const { loading: createMessageRequestSent, success: successMessageCreate } = messageCreate;

    const requestCreate = useSelector((state) => state.requestCreate);
    const { success: successRequestCreate, request: createdRequest } = requestCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {  
            return;
        } 
        dispatch(createRequest({housing_offer_id: offer._id, user: userInfo._id, content}));
        navigate(`/requests`);
        window.location.reload();
        
        
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
                        <Carousel>
                            {offer && offer.images && offer.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.image}
                                        alt={`Image ${index}`}
                                    />
                                </Carousel.Item>
                            ))}
                            </Carousel>
                    </Col>
                    <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{offer.title}</h3>
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
                            <div className="text-center my-3"> 
                                <Button type='submit' variant='primary'>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            )}
            {successMessageCreate && <Message variant='success'>Message submitted successfully!</Message>}
        </div>
    );
}

export default OfferScreen;
