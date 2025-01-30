import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/navbar';
import Hero from '../components/hero';
import Services from '../components/services';
import Pricing from '../components/pricing';
import About from '../components/about';
import Footer from '../components/Footer';
import Admin from './Admin'; // Import the Admin component

const Home = () => {
  const location = useLocation();
  const [adminRender, setAdminRender] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const adminParam = searchParams.get('admin');

    if (adminParam === 'true') {
      setAdminRender(true); // Set the state to render the Admin component
    } else {
      setAdminRender(false); // Set the state to render the default components
    }
  }, [location.search]);

  return (
    <>
      <Header />
      {adminRender ? (
        <Admin /> // Render the Admin component when adminRender is true
      ) : (
        <>
          <Hero />
          <Services />
          <Pricing />
          <About />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
