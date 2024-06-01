// src/pages/HomePage.tsx
import React from 'react';
import BikeList from '../components/BikeList';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className='container'>
      <h2 className='title' style={{backgroundColor:'#035aaa54'}}>Reported Bike Thefts in Munich</h2>
      <BikeList />
      <Footer />
    </div>
  );
};

export default HomePage;
