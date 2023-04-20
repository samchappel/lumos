import React from "react";
import LocationsCard from './LocationsCard';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocationData } from './redux/actions';

function Home({locations, setLocations, setError, setLocationData}) {

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
              setLocationData({ city, state }); 
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
      
    const locationCards = locations.map(location => <LocationsCard key={location.id} location={location} setLocations={setLocations}/>)

    return (
      <>
        <Search handleSearch={handleSearch} />
        <div style={{ backgroundColor: 'var(--secondary-color)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', marginBottom: '20px' }}>
          {locationCards}
        </div>
      </>
    )
}

const mapDispatchToProps = {
  setLocationData,
};

export default connect(null, mapDispatchToProps)(Home);