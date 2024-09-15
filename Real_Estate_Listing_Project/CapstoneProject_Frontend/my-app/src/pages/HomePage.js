import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import HeaderAdvanced from '../Navbars/HeaderAdvanced';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/homepage.css'; 

const Home = () => {
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth.token) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <HeaderAdvanced />
      <main className="home-page d-flex flex-column align-items-center justify-content-center">
        <h1 className="h1welcome text-white">Welcome {auth.username}</h1>
        <div className="text-center">
          <h1 className="h1text display-3">NEW PROPERTIES</h1>
          <h3 className="h3text">Exclusively by Luxury Space</h3>
          <a href="/properties" className="btn btn-danger btn-lg mt-3">EXPLORE MORE</a>
        </div>
      </main>
    </>
  );
};

export default Home;
