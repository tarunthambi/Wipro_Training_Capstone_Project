import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './Navbars/Footer';
import './App.css';
import Home from './pages/HomePage';
import Contact from './pages/ContactPage';
import Profile from './pages/ProfilePage';
import Properties from './pages/PropertiesPage';
import Comparison from './pages/ComparisonPage';
import Logout from './components/Logout';
import Favorites from './pages/FavoritesPage';
import AdminDashboard from './pages/AdminDashboard';
import ManageProperties from './pages/ManageProperties';
import Reports from './pages/ReportsPage';
import UserInquires from './pages/UserInquiresPage';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Logout />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/manage-properties" element={<ManageProperties />} />
            <Route path="/reports" element={<Reports/>} />
            <Route path="/user-inquires" element={<UserInquires/>} />

          </Routes>
        </main>
      </Router>
      <Footer />
    </div> 
  );
};

export default App;
