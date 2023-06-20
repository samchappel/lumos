// import React, { useState, useEffect } from 'react';

// function FavoritesCard({ favorite }) {
//     const { location } = favorite;
  
//     return (
//       <li className="card">
//         <div className="image">
//           <Link to={`/locations/${location.id}`}>
//             <img src={location.image} alt={location.name} />
//           </Link>
//         </div>
//         <div className="center">
//           <h3 className="name">{location.name}</h3>
//           <h4>{location.city}</h4>
//           <h4>{location.state}</h4>
//           <p>Sunrise: {location.sunrise}</p>
//           <p>Sunset: {location.sunset}</p>
//           <p>Golden Hour: {location.goldenHour}</p>
//           <p>Day Length: {location.dayLength}</p>
//         </div>
//       </li>
//     );
//   }

//   export default FavoritesCard;