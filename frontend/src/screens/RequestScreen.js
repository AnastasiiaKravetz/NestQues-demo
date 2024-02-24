import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { listRequests, deleteRequest as deleteRequestAction } from '../actions/requestActions';
import { deleteMessagesByRequestId } from '../actions/messageAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

function RequestScreen() {
    const dispatch = useDispatch();
    const requestList = useSelector(state => state.requestList);
    const { loading, error, requests } = requestList;

    useEffect(() => {
        dispatch(listRequests());
    }, [dispatch]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            dispatch(deleteMessagesByRequestId(id)); 
            dispatch(deleteRequestAction(id)); 
            window.location.reload();
        }
    };

    return (
        <div>
            <Row className='align-items-center my-2'>
                <Col>
                    <h1>All Requests</h1>
                </Col>
            </Row>
            
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(requests) && requests.map(request => (
                                <tr key={request._id}>
                                    <td>{request._id}</td>
                                    <td>{request.housing_offer.title}</td>
                                    <td> 
                                        <div className="button-container">
                                            <Button variant='danger' className='btn-sm my-2' onClick={() => deleteHandler(request._id)}>
                                                <i className='fas fa-trash'></i> Delete
                                            </Button>
                                            <LinkContainer to={`/chat/${request._id}`}>
                                                <Button variant='light' className='btn-sm my-2'>
                                                    <i className='fas fa-edit'></i> Chat
                                                </Button>
                                            </LinkContainer>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default RequestScreen;
