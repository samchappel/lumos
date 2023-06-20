// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Favorites({ user }) {
//     const [favorites, setFavorites] = useState([]);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       fetch(`/userfavorites`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`Error fetching data: ${response.status}`);
//           }
//           return response.json()
//         })
//         .then(setFavorites)
//         .catch(error => {
//           console.error('Error fetching data:', error)
//           setError(error.message)
//         });
//     }, [user]);
  
//     function FavoritesCard({ favorite }) {
//       const { location } = favorite;
  
//       return (
//         <li className="card">
//           <div className="image">
//             <Link to={`/locations/${location.id}`}>
//               <img src={location.image} alt={location.name} />
//             </Link>
//           </div>
//           <div className="center">
//             <h3 className="name">{location.name}</h3>
//             <h4>{location.city}</h4>
//             <h4>{location.state}</h4>
//             <p>Sunrise: {location.sunrise}</p>
//             <p>Sunset: {location.sunset}</p>
//             <p>Golden Hour: {location.goldenHour}</p>
//             <p>Day Length: {location.dayLength}</p>
//           </div>
//         </li>
//       );
//     }
  
//     return (
//       <div>
//         {user ? (
//           <ul className="cards">
//             {favorites.map(favorite => (
//               <FavoritesCard key={favorite.id} favorite={favorite} />
//             ))}
//           </ul>
//         ) : (
//           <p>Please log in to see your favorites.</p>
//         )}
//       </div>
//     );
//   }

// export default Favorites;