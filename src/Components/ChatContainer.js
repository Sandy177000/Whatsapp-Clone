import React, { useEffect, useRef } from 'react';
import './ChatContainer.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { InsertEmoticon } from '@mui/icons-material';
import { AttachFile } from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import { SendRounded } from '@mui/icons-material';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';


function ChatContainer({currentUser}) {

  const [message, setMessage] = useState("");
  const [OpenBox, setOpenBox] = useState(false);
  const { emailID }= useParams();
  const [chatUser, setChatUser]  = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const chatBox = useRef(null)

  useEffect(()=>{
    const getUser = async() =>{
      const data = await db
      .collection("users")
      .doc(emailID)
      .onSnapshot((snapshot)=>{
          setChatUser(snapshot.data())
      })
    }

    const getMessages = async()=>{
      const data = await db
      .collection("chats")
      .doc(emailID).collection("messages")
      .orderBy("timeStamp","asc")
      .onSnapshot((snapshot) =>{
        let messages = snapshot.docs.map((doc) => doc.data());

        let newMessage  = messages.filter(
          (message)=> 
          message.senderEmail === (currentUser.email || emailID ) 
          || message.receiverEmail === (currentUser.email || emailID)
          );

          setChatMessages(newMessage)
      });
    };
    getUser();
    getMessages();
  },[emailID]);

  useEffect(()=>{
    chatBox.current.addEventListener('DOMNodeInserted', (event) =>{
      const {currentTarget :target} = event;
      target.scroll({top: target.scrollHeight, behavior:"smooth"});
    });
  },[chatMessages])

  const send =(e) =>{
    e.preventDefault()

    if(emailID){
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),

      };
    // sender
    
    db.collection("chats").doc(currentUser.email).collection("messages").add(payload);
    
    //receiver
    db.collection("chats").doc(emailID).collection("messages").add(payload);

    db.collection("FriendList").doc(currentUser.email).collection('list').doc(emailID).set({
      email: chatUser.email,
      fullname: chatUser.fullname,
      photoURL: chatUser.photoURL,
      lastMessage :message,
    });

    db.collection('FriendList')
    .doc(emailID).collection('list')
    .doc(currentUser.email)
    .set({email:currentUser.email,
          fullname:currentUser.fullname,
          photoURL:currentUser.photoURL,
          lastMessage:message,
    })

    setMessage("");
  
  }
  }

  return (
    <div className="chat-container">
      <div className="chat-container-header">
            <div className="chat-user-info">
                <div className="chat-user-img">
                    <img src={chatUser?.photoURL} alt=""/>
                </div>
                <p>{chatUser?.fullname}</p>
            
              </div>
              
            <div className="chat-container-header-btn">
                <MoreVertIcon/>
            </div>
      </div>
      
      <div className="chat-display-container" ref = {chatBox}>
          {chatMessages.map((message)=>(<ChatMessage
            message={message.text}
            time = {message.timeStamp}
            sender={message.senderEmail}/>
            ))}
            
      </div>


      <div className='chat-input'>

          {OpenBox && <EmojiPicker onEmojiClick={(emojiObject,event)=>setMessage(message+emojiObject.emoji)}/>}
          
          <div className='chat-input-btn'> 
                  <InsertEmoticon onClick ={() =>setOpenBox(!OpenBox)}/>
                  <AttachFile/>
          </div>

          <form onSubmit={send}>
            <input type = "text" 
              value ={message}
              onChange={(e)=>{setMessage (e.target.value);}}
            placeholder = "Type a Message"/>

          </form>

          <div className="chat-input-send-btn" onClick={send}>
            <SendRounded/>
          </div>
      </div>

    </div>
  )
}

export default ChatContainer
