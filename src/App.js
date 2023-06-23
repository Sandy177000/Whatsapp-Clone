import './App.css';
import {BrowserRouter as Router, Routes, Route} 
from "react-router-dom";
import HomePage from './Components/HomePage';
import ChatPage from './Components/ChatPage';
import { useState } from 'react';
import Login from './Components/Login';
import { auth } from './firebase';
import SideBar from './Components/SideBar';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const signOut = ()=>{
      auth.signOut().then(()=>{
        setUser(null)
        localStorage.removeItem(user);
      })
      .catch((e)=>{
          alert(e.message);
      })
      
  }


  return (
    <Router>
      <div className='App'>
       {
        user ? (
          <Routes>
            <Route path="/" element={<HomePage currentUser = {user} signOut = {signOut}/>}></Route>
            <Route path="/:emailID" element ={ <ChatPage currentUser = {user}  signOut = {signOut}/>}></Route>
          </Routes> 
        ):(<Login setUser={setUser}/>)
      
      }

      </div>
    </Router>
  );
}

export default App;
