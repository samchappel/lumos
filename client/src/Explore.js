import React from "react";
import LocationsCard from './LocationsCard';
// import ExploreDropDown from './ExploreDropDown';
import { connect } from 'react-redux';
import { setLocationData, setLocations } from './redux/actions';

function Explore({ locations, setLocations }) {
  
    const locationCards = locations.map(location => <LocationsCard key={location.id} location={location} setLocations={setLocations}/>)

    function formatDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
        const dayOfWeek = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const dayOfMonth = date.getDate();
        const year = date.getFullYear();
      
        const suffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
        const dayStr = dayOfMonth.toString();
        const daySuffix = (dayOfMonth % 100 >= 11 && dayOfMonth % 100 <= 13) ? 'th' : suffix[dayStr[dayStr.length - 1]];
      
        return `${dayOfWeek} ${monthName} ${dayOfMonth}${daySuffix}, ${year}`;
      }
      
      const today = new Date();
      const formattedDate = formatDate(today);

  return (
    <>
        <h2 className="text-center text-2xl my-4">Explore Sunrise & Sunset Times in National Parks</h2>
        <h3 className="text-center text-xl my-2">Current Data for {formattedDate}</h3>
        {/* <ExploreDropDown /> */}
        <div className="flex flex-wrap justify-center p-5 mb-5">
            {locationCards}
        </div>
    </>
  )
}

const mapDispatchToProps = {
  setLocationData,
  setLocations,
};

export default connect(null, mapDispatchToProps)(Explore);