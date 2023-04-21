import React from "react";
import LocationsCard from './LocationsCard';
import { connect } from 'react-redux';
import { setLocationData } from './redux/actions';

function Home({ locations, setLocations }) {
  
  const locationCards = locations.map(location => <LocationsCard key={location.id} location={location} setLocations={setLocations}/>)

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', marginBottom: '20px' }}>
        {locationCards}
      </div>
    </>
  )
}

const mapDispatchToProps = {
  setLocationData,
};

export default connect(null, mapDispatchToProps)(Home);