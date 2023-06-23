import React from 'react'
import './HomePage.css'
import SideBar from './SideBar';
import whatsapplogo from './WhatsAppbg.png'


function HomePage({currentUser, signOut}){
    return(
        <div className='home'>
            <div className='home-container'> 
               <SideBar currentUser={currentUser} signOut = {signOut}/>
               <div className='home-bg'>
                    <img src ={whatsapplogo}></img>
               </div>

            </div>
        </div>
    )
}

export default HomePage