import React, { useState, useEffect } from "react";
import FormattedDate from './FormattedDate';
import LocationsCard from './LocationsCard';
import ExploreSearch from './ExploreSearch';

function Explore() {
  const [ locations, setLocations ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");

  useEffect(() => {
    const fetchLocations = () => {
      fetch('/locations')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json()
      })
      .then(setLocations)
      .catch(error => {
        console.error('Error fetching data:', error)
      });
    };
    fetchLocations();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLocations = locations.filter((location) => {
    const name = location.name.toLowerCase();
    const city = location.city.toLowerCase();
    const state = location.state.toLowerCase();
    const search = searchTerm.toLowerCase();
  
    return name.includes(search) || city.includes(search) || state.includes(search);
  });

  const locationCards = filteredLocations.map(location => (
    <LocationsCard
      key={location.id}
      location={location}
      setLocations={setLocations}
    />
  ));

  return (
    <>
      <h2 className="text-center text-2xl my-4">Explore Sunrise & Sunset Times in U.S. National Parks</h2>
      <FormattedDate />
      <div className="collapse bg-background text-center mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-l text-secondary font-medium">
          Click here to view a few notes on this data
        </div>
        <div className="collapse-content text-secondary">
          <ul className="list-disc list-inside">
            <li>All sunrise and sunset data is dynamically updated daily to ensure you have the most accurate and current information.</li>
            <li>All times are displayed in each park's local timezone.</li>
            <li>To view the local timezones corresponding to a park, simply hover over the displayed times.</li>
          </ul>
        </div>
      </div>
      <ExploreSearch searchTerm={searchTerm} updateSearchTerm={handleSearch} />
      <div className="flex flex-wrap justify-center p-5 mb-5 pb-8">
        {locationCards}
      </div>
    </>
  )
}

export default Explore;