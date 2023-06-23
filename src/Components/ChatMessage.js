import React from 'react';
import "./ChatMessage.css";
import { auth } from '../firebase';

function ChatMessage({message, time, sender}) {
  return (
    <div className='chat-message'
    style={{alignSelf: sender === auth?.currentUser?.email ? 'flex-end': 'flex-start' }}
    
    >
      <div className='chat-message-text'>
           <p>{message}</p>
      </div>
      <div className='chat-message-data'>
          <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ChatMessage;
