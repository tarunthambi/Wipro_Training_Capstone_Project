import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../Navbars/HeaderAdmin';

const Reports = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [bedroomChartData, setBedroomChartData] = useState({});
  const [priceChartData, setPriceChartData] = useState({});
  const [totalProperties, setTotalProperties] = useState(0);
  const [uniqueAgents, setUniqueAgents] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5227/api/Properties')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setPropertyData(response.data);
          setTotalProperties(response.data.length); // Total number of properties
          generateUniqueAgentsCount(response.data); // Count unique agents
          generateBedroomChart(response.data);
          generatePriceChart(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching property data:', error);
      });
  }, []);

  const generateUniqueAgentsCount = (data) => {
    const agentNames = new Set();
    data.forEach((property) => {
      if (property.agent && property.agent.name) {
        agentNames.add(property.agent.name); // Only add unique agent names
      }
    });
    setUniqueAgents(agentNames.size); // Set the unique agent count
  };

  const generateBedroomChart = (data) => {
    if (!data || data.length === 0) return; 

    const bedroomCounts = data.reduce((acc, property) => {
      const bedrooms = property.numberOfBedrooms || 0;
      acc[bedrooms] = (acc[bedrooms] || 0) + 1;
      return acc;
    }, {});

    setBedroomChartData({
      labels: Object.keys(bedroomCounts),
      datasets: [
        {
          label: 'Number of Properties',
          data: Object.values(bedroomCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const generatePriceChart = (data) => {
    if (!data || data.length === 0) return; 

    const propertyTitles = data.map((property) => property.title || 'Unnamed Property');
    const propertyPrices = data.map((property) => property.price || 0);

    setPriceChartData({
      labels: propertyTitles,
      datasets: [
        {
          label: 'Price of Properties',
          data: propertyPrices,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Property Reports</h2>

        {/* Show the total number of properties and unique agents */}
        <div className="row text-center mb-4">
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h3>Total Properties</h3>
              <p className="display-4">{totalProperties}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h3>Agents</h3>
              <p className="display-4">{uniqueAgents}</p>
            </div>
          </div>
        </div>

        {propertyData.length === 0 ? (
          <p className="text-center">Loading data...</p>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="chart-container" style={{ height: '40vh' }}>
                <h4>Number of Bedrooms</h4>
                <Bar data={bedroomChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="chart-container" style={{ height: '40vh' }}>
                <h4>Property Prices</h4>
                <Bar data={priceChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
