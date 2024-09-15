import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdvanced from '../Navbars/HeaderAdvanced';

const Logout = () => {

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/');
    };
    
    return (
      <>
        <HeaderAdvanced />
        <div>
            <h2>See you again...</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
      </>
    );
  };
  
  export default Logout;