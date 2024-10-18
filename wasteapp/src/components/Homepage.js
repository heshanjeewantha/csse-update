// src/HomePage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRecycle, FaTrashAlt, FaLeaf } from 'react-icons/fa'; // Import relevant icons

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-success text-white text-center py-5">
        <img 
          src="https://as2.ftcdn.net/v2/jpg/07/68/68/71/1000_F_768687115_5XhRZzfBCQDIEgtqDUHEO9tSvMUjAHqw.jpg" // Replace with a valid URL
          alt="Eco-friendly banner" 
          className="img-fluid mb-4" 
          style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }} 
        />
        <h1>Welcome to GreenEn</h1>
        <p>Your Waste Management Partner</p>
        <a href="#services" className="btn btn-light mt-3">Learn More</a>
      </header>

      {/* Mission Section */}
      <section className="container text-center my-5">
        <h2>Our Mission</h2>
        <p>We promote eco-friendly waste management practices that benefit both the environment and society. Join us in creating a sustainable future.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="container my-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row text-center">
          {/* Waste Collection */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <FaTrashAlt size={40} className="text-success mb-3" />
                <h5 className="card-title">Waste Collection</h5>
                <p className="card-text">Efficient and timely waste collection services for households and businesses.</p>
              </div>
            </div>
          </div>

          {/* Recycling Solutions */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <FaRecycle size={40} className="text-success mb-3" />
                <h5 className="card-title">Recycling Solutions</h5>
                <p className="card-text">Comprehensive recycling solutions to reduce your carbon footprint.</p>
              </div>
            </div>
          </div>

          {/* Green Products */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <FaLeaf size={40} className="text-success mb-3" />
                <h5 className="card-title">Green Products</h5>
                <p className="card-text">Eco-friendly products to support sustainable living.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
