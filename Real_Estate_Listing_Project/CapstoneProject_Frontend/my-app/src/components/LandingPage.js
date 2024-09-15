import React from 'react';
import HeaderSimple from '../Navbars/HeaderSimple';
import '../styles/landingpage.css';

const LandingPage = () => {
  return (
    <>
      <HeaderSimple />
      <main className="landing-page">
        <section className="hero-section">
          <div className='h1tag'>
            <h1>The #1 site real estate professional trust*</h1>
          </div>
          <a href="/register" className="btn btn-primary">Explore Now</a>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
