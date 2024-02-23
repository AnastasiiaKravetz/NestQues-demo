import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listMessages } from '../actions/messageAction'; 
import Loader from '../components/Loader';
import Message from '../components/Message';

function ChatScreen() {
    const dispatch = useDispatch();
    const { id } = useParams(); 
    const messageList = useSelector(state => state.messageList); 

    useEffect(() => {
        
        dispatch(listMessages(id));
    }, [dispatch, id]);

    return (
        <div>
            <h1>Chat Screen</h1>
            {messageList.loading ? (
                <Loader />
            ) : messageList.error ? (
                <Message variant='danger'>{messageList.error}</Message>
            ) : (
                <div>
                    {/* Display messages */}
                    <ul>
                        {messageList.messages.map(message => (
                            <li key={message._id}>{message.content}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ChatScreen;
