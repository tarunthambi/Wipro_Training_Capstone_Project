import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/homepage.css'; 
import HeaderAdmin from '../Navbars/HeaderAdmin';

const UserInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios.get('http://localhost:5178/api/ContactAgent')
      .then((response) => {
        setInquiries(response.data); // Set inquiries data
      })
      .catch((error) => {
        console.error('Error fetching user inquiries:', error);
      });
  }, []);

  const handleResolve = (inquiry) => {
    // Display an alert when the resolve button is clicked
    alert(`${inquiry.fullName}, your inquiry is resolved!`);

    // Email details for the resolved inquiry
    const mail = {
      toEmail: "tarunthambibonagiri2000@gmail.com", // Use the user's email from the inquiry
      toName: inquiry.fullName, // Use the user's full name from the inquiry
      subject: "Your inquiry has been resolved",
      body: `Dear ${inquiry.fullName},\n\nYour inquiry has been resolved. Thank you for reaching out to us.\n\nBest regards,\nThe Team`,
    };

    // Send the email notification via the notification service
    axios.post("http://localhost:5096/api/Mail", mail)
      .then((res) => {
        console.log("Email sent successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container mt-4">
        <div className="text-center mb-4">
          <h1 className="text-black">USER INQUIRIES</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Scheduled Timing</th>
                  <th scope="col">Agent Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry, index) => (
                    <tr
                      key={inquiry.id}
                      style={{ backgroundColor: index % 2 === 0 ? '#d3d3d3' : '#add8e6' }}
                    >
                      <th scope="row">{index + 1}</th>
                      <td>{inquiry.fullName}</td>
                      <td>{inquiry.email}</td>
                      <td>{inquiry.phoneNumber}</td>
                      <td>{new Date(inquiry.scheduleTiming).toLocaleString()}</td>
                      <td>{inquiry.agentEmail}</td>
                      <td>{inquiry.message}</td>
                      <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
                      <td>
                        {/* Resolve button */}
                        <button 
                          className="btn btn-success btn-sm" 
                          onClick={() => handleResolve(inquiry)}
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No inquiries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInquiries;
