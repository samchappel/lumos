import React from "react";
import LocationsCard from './LocationsCard';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

function Home({locations, setLocations, setError}) {

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
              navigate(`/results/${lat}/${lng}`);
            }
          })
          .catch(error => {
            console.error('Error fetching geocode data:', error);
            setError(error.message);
          });
      };
      
    const locationCards = locations.map(location => <LocationsCard key={location.id} location={location} setLocations={setLocations}/>)

    return (
        <div>
            <Search handleSearch={handleSearch} />
            <ul className="cards">{locationCards}</ul>
        </div>
    )
}

export default Home;