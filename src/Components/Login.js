import React from 'react'
import googlelogo from './google-logo.png'
import logo from "./Wlogo.png"
import './Login.css'

import db, {auth, googleProvider} from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = ({setUser}) => {

    const navigate = useNavigate()

    const signingwithgoogle = () =>{
        auth
        .signInWithPopup(googleProvider)
           .then((result) =>{
               const newUser = {
                fullname : result.user.displayName,
                email: result.user.email,
                photoURL : result.user.photoURL
            }
            navigate('/')
            setUser(newUser)
            localStorage.setItem('user',JSON.stringify(newUser));
            db.collection('users').doc(result.user.email).set(newUser);
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

  return (

    <div className='login'>
      <div className='login-container'>
         <img src={logo} className='login-logo'/>  
       
      <p className='login-name'>WhatsApp Web</p>
      <button className='login-btn' onClick={signingwithgoogle}>
          <img src={googlelogo}/>  
          Login  with google
      </button>
      </div>
    </div>

  )
}

export default Login
