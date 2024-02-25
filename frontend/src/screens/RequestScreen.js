import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { listRequests, deleteRequest as deleteRequestAction } from '../actions/requestActions';
import { deleteMessagesByRequestId } from '../actions/messageAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import Paginate from '../components/Paginate';

function RequestScreen() {
    const dispatch = useDispatch();
    const requestList = useSelector(state => state.requestList);
    const { loading, error, requests, page, pages } = requestList;

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
                    <h1 className="fs-2" >All Requests</h1>
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
                                <th className="fs-4" style={{ color: '#485785' }}>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(requests) && requests.map(request => (
                                <tr key={request._id}>
                                    <td className="fs-4" style={{ color: '#485785' }}>{request.housing_offer.title}</td>
                                    <td className="text-end"> 
                                        <div className="button-container">
                                            <LinkContainer to={`/chat/${request._id}`}>
                                                <Button variant='light' className='btn my-3'>
                                                    <i className='fs-4'></i> Chat
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn my-3' onClick={() => deleteHandler(request._id)}>
                                                <i className='fs-4'></i> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} />
                </div>
            )}
        </div>
    );
}

export default RequestScreen;
