// import React from 'react';
// import { connect } from 'react-redux';
// import { setLocationData, setLocations } from './redux/actions';

// function ExploreDropDown({ locations, setLocations }) {
//   const handleDropdownChange = (event) => {
//     const selectedState = event.target.value;
//     const filteredLocations = locations.filter((location) => location.state === selectedState);
//     setLocations(filteredLocations);
//   };

//   const stateOptions = [...new Set(locations.map((location) => location.state))];

//   return (
//     <div className="text-center mb-4">
//       <label htmlFor="stateDropdown" className="mr-2 font-semibold">
//         Select a State:
//       </label>
//       <select
//         id="stateDropdown"
//         className="border rounded-lg px-3 py-2"
//         onChange={handleDropdownChange}
//       >
//         <option value="">All States</option>
//         {stateOptions.map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     locations: state.locationsReducer.locations,
//   };
// };

// const mapDispatchToProps = {
//   setLocationData,
//   setLocations,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ExploreDropDown);