import React from "react";
import LocationsCard from './LocationsCard'

function Home({locations, setLocations}) {

    const locationCards = locations.map(location => <LocationsCard key={location.id} location={location} setLocations={setLocations}/>)

    return (
        <div>
            <ul className="cards">{locationCards}</ul>
        </div>
    )
}

export default Home;