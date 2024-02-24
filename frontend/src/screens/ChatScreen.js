import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';
import { listMessages, createMessage } from '../actions/messageAction'; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { MESSAGE_CREATE_RESET } from '../constants/messageConstans';

function ChatScreen() {
    const dispatch = useDispatch();
    const { id } = useParams(); 
    const messageList = useSelector(state => state.messageList); 
    const { userInfo } = useSelector(state => state.userLogin);
    const [content, setContent] = useState('');
    const [requestId, setRequestId] = useState(null); 
    
    const messageCreate = useSelector((state) => state.messageCreate);
    const { success: successMessageCreate } = messageCreate;

    useEffect(() => {
        setRequestId(id); // Set the requestId state
        dispatch(listMessages(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (successMessageCreate) {
            dispatch({ type: MESSAGE_CREATE_RESET });
            window.location.reload();
        }
    }, [dispatch, successMessageCreate]);

    const handleChange = (e) => {
        setContent(e.target.value); // Set content as string
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content || !requestId) {
            return;
        }
        
        dispatch(createMessage( content , requestId));
    };
    

    return (
        <div>
            <h1>Chat Screen</h1>
            {messageList.loading ? (
                <Loader />
            ) : messageList.error ? (
                <Message variant='danger'>{messageList.error}</Message>
            ) : (
                <div>
                    <Table striped bordered className='message-table'>
                        <tbody>
                            {messageList.messages.map((message, index) => (
                                <tr key={message._id} className="highlighted-message">
                                    <td style={{ textAlign: message.user === userInfo._id ? 'right' : 'left' }}>
                                        {message.content}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Form onSubmit={handleSubmit} className='my-4'>
                        <Form.Group controlId='message'>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows='3'
                                value={content} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default ChatScreen;
