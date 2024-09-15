import React, { useEffect, useState } from 'react';
import axios from '../components/axios';
import '../styles/profilepage.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import HeaderAdvanced from '../Navbars/HeaderAdvanced';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [formValues, setFormValues] = useState({
    userName: '',
    phoneNumber: ''
  });
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !username) {
        setError('No token or username found.');
        setLoading(false);
        return;
      }

      try {
        const url = `http://localhost:5274/api/Auth/${username}`;
        const response = await axios.get(url, { 
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        setFormValues({
          userName: response.data.userName || '',
          phoneNumber: response.data.phoneNumber || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const url = `http://localhost:5274/api/Auth/${username}`;
      const response = await axios.put(url, {
        userName: formValues.userName,
        phoneNumber: formValues.phoneNumber
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUpdateSuccess('Profile updated successfully!');
      setUpdateError('');
      setShowModal(false);
      
      // Update local state with new profile data
       setProfile((prevProfile) => ({
        ...prevProfile,
        userName: formValues.userName,
        phoneNumber: formValues.phoneNumber
      }));

      // Update the username in localStorage if it has been changed
        if (formValues.userName !== username) {
          localStorage.setItem('username', formValues.userName);
        }

    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      setUpdateError(error.response ? error.response.data.message : 'Error updating profile data');
    }
  };

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    return (
      <div className="loading-container">
        <div className="loading-message">Loading Please stay calm...</div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data found</div>;

  return (
    <>
    <HeaderAdvanced/>
    <div className="container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/pro.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '70vh' }}>
      <div className="profile-container p-4 border rounded shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: 'auto' }}>
        <h2>PROFILE DETAILS</h2>
        <div className='userdetails'>
          <p><strong>Name:</strong> {profile.userName || 'N/A'}</p> 
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber || 'N/A'}</p>
        </div>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          Edit Profile
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {updateError && <div className="alert alert-danger">{updateError}</div>}
            {updateSuccess && <div className="alert alert-success">{updateSuccess}</div>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="userName" 
                  value={formValues.userName} 
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="phoneNumber" 
                  value={formValues.phoneNumber} 
                  onChange={handleChange} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    </>
  );
};

export default Profile;