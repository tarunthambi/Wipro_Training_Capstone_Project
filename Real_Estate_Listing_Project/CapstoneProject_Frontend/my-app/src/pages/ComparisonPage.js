import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderAdvanced from '../Navbars/HeaderAdvanced';
import '../styles/comparisonpage.css';
import { Form, Button, Alert } from 'react-bootstrap';

const Comparison = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState([null, null, null]); 
  const [comparedProperties, setComparedProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5227/api/Properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const handlePropertyChange = (index, propertyId) => {
    const updatedSelections = [...selectedPropertyIds];
    updatedSelections[index] = propertyId;
    setSelectedPropertyIds(updatedSelections);
  };

  const handleCompare = () => {
    const selectedCount = selectedPropertyIds.filter(propertyId => propertyId !== null).length;
    if (selectedCount < 2) {
      setErrorMessage('At least two properties are needed to compare');
    } else {
      const queryParams = selectedPropertyIds.map((propertyId, idx) => propertyId ? `property${idx + 1}=${propertyId}` : '').filter(Boolean).join('&');

      axios.get(`http://localhost:5267/api/Comparison/compare?${queryParams}`)
        .then(response => {
          setComparedProperties(response.data);
          setErrorMessage('');
        })
        .catch(error => {
          console.error('Error comparing properties:', error);
        });
    }
  };

  const handleContactAgent = () => {
    navigate('/contact');
  };

  return (
    <>
      <HeaderAdvanced />
      <div className="comparison-container">
        <h2>Compare Properties</h2>
        
        <div className="row mb-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="col-md-4" key={index}>
              <Form.Select
                value={selectedPropertyIds[index] || ''} 
                onChange={e => handlePropertyChange(index, e.target.value)} 
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.title}
                  </option>
                ))}
              </Form.Select>
            </div>
          ))}
        </div>
        
        <Button variant="primary" onClick={handleCompare}>Compare</Button>

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}

        {comparedProperties.length > 1 && (
          <div className="comparison-table mt-4">
            <div className="row">
              <div className="col-md-3"><strong>Property Details</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  <strong>{property.title}</strong>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Image</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  <img src={`http://localhost:5227/images/${property.image}`} alt={property.title} className="property-image" />
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Price</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  ${property.price}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Location</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  {property.location}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Size</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  {property.size} sq. ft.
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Bedrooms</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  {property.numberOfBedrooms} Bedrooms
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Status</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  {property.status}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Description</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  {property.description}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Agent</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  {property.agent.name}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-3"><strong>Contact Agent</strong></div>
              {comparedProperties.map((property, index) => (
                <div className="col-md-3" key={index}>
                  <button onClick={handleContactAgent} className="contact-button">
                    Contact Agent
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comparison;
