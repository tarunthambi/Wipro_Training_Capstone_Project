import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import HeaderAdvanced from '../Navbars/HeaderAdvanced';
import '../styles/propertiespage.css';

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('status');
  const [filterValue, setFilterValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5227/api/Properties');
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);


  const handleSearch = () => {
    const searchText = searchTerm.toLowerCase();
    const filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(searchText)
    );

    setFilteredProperties(filtered);
  };


  const handleFilter = () => {
    let filtered = [...properties];

    if (filterType === 'price' || filterType === 'size') {
      filtered = filtered.filter(
        (property) =>
          property[filterType] >= parseFloat(minValue) &&
          property[filterType] <= parseFloat(maxValue)
      );
    } else {
      filtered = filtered.filter(
        (property) =>
          property[filterType].toLowerCase() === filterValue.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <>
      <HeaderAdvanced />
      <div className="upper-part d-flex flex-column justify-content-center align-items-center" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/back1.png)` }}>
        
        <div className="text-center mb-4">
          <h1 className="text-white">OUR EXCLUSIVE PROPERTIES</h1>
          <h2 className="text-white">FROM LUXURY SPACE</h2>
        </div>

        <div className="d-flex searchbar">
          <input 
            type="search" 
            className="form-control me-2 search-input" 
            placeholder="Search properties..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button 
            className="btn btn-danger search-button" 
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="container mt-4">
        <Row>
          <Col md={3} sm={12}>
            <Card className="filters p-3">
              <h4>Filter Properties</h4>

              <Form.Group className="mb-3">
                <Form.Label>Filter by:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="location">Location</option>
                  <option value="price">Price</option>
                  <option value="size">Size</option>
                </Form.Control>
              </Form.Group>

              {filterType === 'status' ? (
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="rent">Rent</option>
                    <option value="sell">Sell</option>
                    <option value="buy">Buy</option>
                  </Form.Control>
                </Form.Group>
              ) : filterType === 'price' || filterType === 'size' ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Min {filterType}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Min ${filterType}`}
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Max {filterType}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Max ${filterType}`}
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Label>Enter {filterType}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter ${filterType}`}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </Form.Group>
              )}

              <Button variant="primary" className="w-100" onClick={handleFilter}>
                Apply Filter
              </Button>
            </Card>
          </Col>

          <Col md={12} sm={12}>
            <Row>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <Col lg={3} md={4} sm={6} xs={12} key={property.propId} className="mb-4">
                    <PropertyCard property={property} />
                  </Col>
                ))
              ) : (
                <div className="text-center mt-4">
                  <h4>No properties found</h4>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PropertyPage;
