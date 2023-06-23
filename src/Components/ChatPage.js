import React from 'react'
import SideBar from './SideBar.js'
import './ChatPage.css'
import ChatContainer from './ChatContainer.js'

function ChatPage({currentUser, signOut}) {
  return (
    <div className='chatpage'>
      <div className='chatpage-container'>
        <SideBar currentUser = {currentUser} signOut={signOut}/>
        <ChatContainer currentUser = {currentUser} />
      </div>
    </div>
  )
}

export default ChatPage
