import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Results() {
  const [sunData, setSunData] = useState(null);
  const { latitude, longitude } = useParams();

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.results); 
          setSunData(data.results);
        })
        .catch(error => console.error('Error fetching sun data:', error));
    }
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
  }, [latitude, longitude]);

  return (
    <div>
      {sunData ? (
        <div>
          <p>Sunrise: {sunData.sunrise}</p>
          <p>Sunset: {sunData.sunset}</p>
          <p>Golden Hour: {sunData.golden_hour}</p>
          <p>Day Length: {sunData.day_length}</p>
        </div>
      ) : (
        <p>Loading sun data...</p>
      )}
    </div>
  );
}

export default Results;