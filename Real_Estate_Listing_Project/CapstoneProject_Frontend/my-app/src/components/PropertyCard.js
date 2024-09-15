// import React, { useState } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const PropertyCard = ({ property }) => {
//   const [showAgentDetails, setShowAgentDetails] = useState(false);
//   const navigate = useNavigate();

//   const toggleAgentDetails = () => {
//     setShowAgentDetails(!showAgentDetails);
//   };

//   const handleContactAgent = () => {
//     navigate('/contact');
//   };

//   return (
//     <Card className="h-100">
//       <Card.Img variant="top" src={`http://localhost:5227/images/${property.image}`} alt={property.title} />
//       <Card.Body>
//         <Card.Title>{property.title}</Card.Title>
//         <Card.Text>
//           <strong>Price:</strong> ${property.price} <br />
//           <strong>Location:</strong> {property.location} <br />
//           <strong>Size:</strong> {property.size} sqft <br />
//           <strong>Bedrooms:</strong> {property.numberOfBedrooms} <br />
//           <strong>Status:</strong> {property.status} <br />
//           <strong>Description:</strong> {property.description}
//         </Card.Text>
//         <Button variant="danger" onClick={handleContactAgent} className="mb-2"style={{ width: '150px' }}>
//           Contact Agent
//         </Button>
//         <Button variant="info" onClick={toggleAgentDetails}>
//           {showAgentDetails ? 'Hide Agent Details' : 'Show Agent Details'}
//         </Button>
//         {showAgentDetails && (
//           <div className="mt-3 border p-3 bg-light">
//             <strong>Agent Name:</strong> {property.agent.name} <br />
//             <strong>Contact:</strong> {property.agent.contact} <br />
//             <strong>Email:</strong> {property.agent.email}
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default PropertyCard;
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import '../styles/propertycard.css';

const PropertyCard = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const navigate = useNavigate();

  // Check if the property is in the favorite list when the component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorited(favorites.includes(property.title));
  }, [property.title]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!property.title) {
      console.error("Invalid property title");
      return;
    }

    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((title) => title !== property.title);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      // Add to favorites
      favorites.push(property.title);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(true);
      alert("Added to favorites");
    }
  };

  const handleContactAgent = () => {
    navigate('/contact');
  };

  return (
    <Card className="h-100">
      <div className="favorite-icon-container">
        <span onClick={toggleFavorite} className="favorite-icon">
          {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
        </span>
      </div>
      <Card.Img variant="top" src={`http://localhost:5227/images/${property.image}`} alt={property.title} />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${property.price} <br />
          <strong>Location:</strong> {property.location} <br />
          <strong>Size:</strong> {property.size} sqft <br />
          <strong>Bedrooms:</strong> {property.numberOfBedrooms} <br />
          <strong>Status:</strong> {property.status} <br />
          <strong>Description:</strong> {property.description}
        </Card.Text>
        <Button variant="danger" onClick={handleContactAgent} className="mb-2" style={{ width: '150px' }}>
          Contact Agent
        </Button>
        <Button variant="info" onClick={() => setShowAgentDetails(!showAgentDetails)}>
          {showAgentDetails ? 'Hide Agent Details' : 'Show Agent Details'}
        </Button>
        {showAgentDetails && (
          <div className="mt-3 border p-3 bg-light">
            <strong>Agent Name:</strong> {property.agent.name} <br />
            <strong>Contact:</strong> {property.agent.contact} <br />
            <strong>Email:</strong> {property.agent.email}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
