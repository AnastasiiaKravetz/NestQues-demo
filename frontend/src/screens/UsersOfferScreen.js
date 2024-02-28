import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteOffer, listOffers } from '../actions/offerActions'; 
import { OFFER_CREATE_RESET } from '../constants/offerConstans';

function UsersOfferScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const offerList = useSelector(state => state.offerList);
    const { loading, error, offers } = offerList;

    const offerDelete = useSelector(state => state.offerDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = offerDelete;

    const offerCreate = useSelector(state => state.offerCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, offer: createdOffer } = offerCreate;

    useEffect(() => {
        dispatch({ type: OFFER_CREATE_RESET });

        if (successCreate) {
            navigate(`/housingoffer/${createdOffer._id}/edit`);
        } 

        if (successDelete) {
            dispatch(listOffers());
        }
    }, [dispatch, navigate, successDelete, successCreate, createdOffer]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this offer?')) {
            dispatch(deleteOffer(id));
        }
    };

    return (
        <Row className='justify-content-md-center'>
            <Col xs={12} md={10}>
                <h1>My Offers</h1>
                <LinkContainer to='/create'>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Create an Offer
                    </Button>
                </LinkContainer>

                {loadingDelete || loadingCreate || loading ? (
                    <Loader />
                ) : errorDelete || errorCreate || error ? (
                    <Message variant='danger'>
                        {errorDelete || errorCreate || error}
                    </Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>PRICE</th>
                                <th>LOCATION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.filter(offer => offer.user === userInfo._id).map(offer => (
                                <tr key={offer._id}>
                                    <td>{offer._id}</td>
                                    <td>{offer.title}</td>
                                    <td>${offer.price}</td>
                                    <td>{offer.location}</td>
                                    <td>
                                    <div className="text-center"> 
                                        <LinkContainer to={`/housingoffer/${offer._id}/edit`}>
                                            <Button variant='light' className='btn-sm my-2'>
                                                <i className='fas fa-edit'></i> Edit
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm my-2' onClick={() => deleteHandler(offer._id)}>
                                            <i className='fas fa-trash'></i> Delete
                                        </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
}

export default UsersOfferScreen;
