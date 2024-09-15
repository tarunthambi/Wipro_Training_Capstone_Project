import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../Navbars/HeaderAdmin';
import '../styles/managepropertiespage.css';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    price: 0,
    location: '',
    size: 0,
    numberOfBedrooms: 0,
    status: '',
    description: '',
    image: '',
    agent: { name: '', contact: '', email: '' }
  });
  const [selectedProperty, setSelectedProperty] = useState('');
  const [formMode, setFormMode] = useState(''); // "Post", "Update", "Delete"
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    // Fetch existing properties to populate dropdowns
    axios.get('http://localhost:5227/api/Properties')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  // Handle the mode change (Post, Update, Delete)
  const handleModeChange = (e) => {
    setFormMode(e.target.value);
    if (e.target.value === 'Post') {
      setNewProperty({
        title: '',
        price: 0,
        location: '',
        size: 0,
        numberOfBedrooms: 0,
        status: '',
        description: '',
        image: '',
        agent: { name: '', contact: '', email: '' }
      });
      setIsReadOnly(false);
    }
    if (e.target.value === 'Delete') {
      setIsReadOnly(true);
    }
    if (e.target.value === 'Update') {
      setIsReadOnly(false);
    }
  };

  // Handle dropdown selection for Update/Delete
  const handlePropertySelect = (e) => {
    const selectedTitle = e.target.value;
    setSelectedProperty(selectedTitle);
    const property = properties.find((prop) => prop.title === selectedTitle);

    if (property) {
      setNewProperty({
        title: property.title,
        price: property.price,
        location: property.location,
        size: property.size,
        numberOfBedrooms: property.numberOfBedrooms,
        status: property.status,
        description: property.description,
        image: property.image,
        agent: property.agent
      });
    }
  };

  const mail={
    toEmail:"tarunthambibonagiri2000@gmail.com",
    toName:"Tarun",
    subject:"Visit your Luxuary space to explore the new property added",
    body:"New Property added in our Luxury Space  "
  }

  const mail1={
    toEmail:"tarunthambibonagiri2000@gmail.com",
    toName:"Tarun",
    subject:"Visit your Luxuary space to take a look of the updated property.You might like this.",
    body:`We have Updated " ${selectedProperty} " Property in our Luxury Space. Go take a look `
  }

  // POST: Create a new property
  const createProperty = () => {
    axios.post('http://localhost:5227/api/Properties', newProperty)
      .then(() => {
        alert('Property created successfully');
      })
      .then(res=>{
        axios.post("http://localhost:5096/api/Mail",mail);
      })
      .catch((error) => {
        console.error('Error creating property:', error);
      });
  };

  // PUT: Update an existing property
  const updateProperty = () => {
    axios.put(`http://localhost:5227/api/Properties/${selectedProperty}`, newProperty)
      .then(() => {
        alert('Property updated successfully');
      })
      .then(res=>{
        axios.post("http://localhost:5096/api/Mail",mail1);
      })
      .catch((error) => {
        console.error('Error updating property:', error);
      });
  };

  // DELETE: Delete a property by title
  const deleteProperty = () => {
    axios.delete(`http://localhost:5227/api/Properties/${selectedProperty}`)
      .then(() => {
        alert('Property deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
      });
  };

  // Update form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('agent.')) {
      const field = name.split('.')[1];
      setNewProperty((prev) => ({
        ...prev,
        agent: { ...prev.agent, [field]: value }
      }));
    } else {
      setNewProperty({ ...newProperty, [name]: value });
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="manage-properties-page container mt-4">
        <h1 className="text-black">Manage Properties</h1>

        {/* Select Action (Post, Update, Delete) */}
        <div className="mb-4">
          <label htmlFor="formMode" className="form-label">Choose Action:</label>
          <select id="formMode" className="form-select" onChange={handleModeChange}>
            <option value="">-- Select Action --</option>
            <option value="Post">Add Property</option>
            <option value="Update">Update Property</option>
            <option value="Delete">Delete Property</option>
          </select>
        </div>

        {/* Dropdown to select a property for Update/Delete */}
        {(formMode === 'Update' || formMode === 'Delete') && (
          <div className="mb-4">
            <label htmlFor="propertySelect" className="form-label">Select Property:</label>
            <select id="propertySelect" className="form-select" onChange={handlePropertySelect}>
              <option value="">-- Select Property --</option>
              {properties.map((property) => (
                <option key={property.title} value={property.title}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Form to manage properties */}
        <form>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" id="title" name="title" className="form-control" onChange={handleInputChange} value={newProperty.title} readOnly={formMode === 'Delete'} />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" id="price" name="price" className="form-control" onChange={handleInputChange} value={newProperty.price} readOnly={formMode === 'Delete'} />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input type="text" id="location" name="location" className="form-control" onChange={handleInputChange} value={newProperty.location} readOnly={formMode === 'Delete'} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="size" className="form-label">Size (sq ft)</label>
              <input type="number" id="size" name="size" className="form-control" onChange={handleInputChange} value={newProperty.size} readOnly={formMode === 'Delete'} />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="numberOfBedrooms" className="form-label">Number of Bedrooms</label>
              <input type="number" id="numberOfBedrooms" name="numberOfBedrooms" className="form-control" onChange={handleInputChange} value={newProperty.numberOfBedrooms} readOnly={formMode === 'Delete'} />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <input type="text" id="status" name="status" className="form-control" onChange={handleInputChange} value={newProperty.status} readOnly={formMode === 'Delete'} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea id="description" name="description" className="form-control" onChange={handleInputChange} value={newProperty.description} readOnly={formMode === 'Delete'} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image URL</label>
            <input type="text" id="image" name="image" className="form-control" onChange={handleInputChange} value={newProperty.image} readOnly={formMode === 'Delete'} />
          </div>

          <h3>Agent Details</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="agent.name" className="form-label">Agent Name</label>
              <input type="text" id="agent.name" name="agent.name" className="form-control" onChange={handleInputChange} value={newProperty.agent.name} readOnly={formMode === 'Delete'} />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="agent.contact" className="form-label">Agent Contact</label>
              <input type="text" id="agent.contact" name="agent.contact" className="form-control" onChange={handleInputChange} value={newProperty.agent.contact} readOnly={formMode === 'Delete'} />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="agent.email" className="form-label">Agent Email</label>
              <input type="email" id="agent.email" name="agent.email" className="form-control" onChange={handleInputChange} value={newProperty.agent.email} readOnly={formMode === 'Delete'} />
            </div>
          </div>

          {/* Action Buttons */}
          {formMode === 'Post' && (
            <button type="button" className="btn btn-primary" onClick={createProperty}>Add Property</button>
          )}
          {formMode === 'Update' && (
            <button type="button" className="btn btn-warning" onClick={updateProperty}>Update Property</button>
          )}
          {formMode === 'Delete' && (
            <button type="button" className="btn btn-danger" onClick={deleteProperty}>Delete Property</button>
          )}
        </form>
      </div>
    </>
  );
};

export default ManageProperties;
