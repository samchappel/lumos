import React, { useState } from 'react';
import Header from './Header';
import { connect, useDispatch } from 'react-redux';
import { setLocationData } from './redux/actions';
import { useNavigate } from 'react-router-dom';

function Home({ setLocationData }) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSearch = (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}`;
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        if (data.results.length === 0) {
          setError('No results found. Please try a different search term.');
        } else {
          const { lat, lng } = data.results[0].geometry.location;
          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          const addressComponents = data.results[0].address_components;
          const cityComponent = addressComponents.find(component => component.types.includes('locality') || component.types.includes('postal_town'));
          const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
          const city = cityComponent?.long_name;
          const state = stateComponent?.short_name;
          dispatch(setLocationData({ city, state })); 
          console.log('city:', city)
          console.log('state:', state)
          navigate({
            pathname: `/results/${lat}/${lng}`,
            state: { city, state },
          });
        }
      })
      .catch(error => {
        console.error('Error fetching geocode data:', error);
        setError(error.message);
      });
  };

  const handleExplore = () => {
    window.scrollTo(0, 0);
    navigate('/explore');
  };

  return (
    <>
      <Header handleSearch={handleSearch} setLocationData={setLocationData}/>
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center text-secondary">
          <h2 className="text-4xl font-bold mb-4 text-primary">Welcome to Lumos</h2>
          <p className="text-lg mb-8 text-accent">Your go-to guide for when the sun will rise and set where it matters most, so you're never left in the dark.</p>
          <p className="text-lg mb-4">
            Lumos is your companion for capturing the beauty and wonder of sunrise and sunset moments. Whether you're a professional photographer, an outdoor enthusiast, or simply appreciate the serene beauty of the sun, Lumos provides you with the information you need to make the most of these magical moments.
          </p>
          <p className="text-lg mb-4">
            With Lumos, you can explore sunrise, sunset, and golden hour times, sun event quality predictions, and weather forecasts for any location. Simply enter your location information in the search bar above to get started. Don't forget, this critical information is ALWAYS up-to-date.
          </p>
          <p className="text-lg mb-8">
            Our Explore page allows you to discover sunrise and sunset data for national parks. Add your favorite parks to your personal collection for at-a-glance reference, and plan your next adventure to witness unforgettable sunrises and sunsets in these breathtaking landscapes.
          </p>
          <p className="text-lg mb-4">
            Join our vibrant community of sun enthusiasts in the Lumos Gallery. Share your own stunning photos of sunrises and sunsets, explore and comment on other community members' photos, and get inspired by the breathtaking beauty captured around the world.
          </p>
          <button className="bg-primary text-accent rounded-lg py-3 px-6 text-lg font-semibold hover:bg-yellow-500" onClick={handleExplore}>Start Exploring ✨</button>
        </div>
      </section>
    </>
  );
}

const mapDispatchToProps = {
  setLocationData,
};

export default connect(null, mapDispatchToProps)(Home);