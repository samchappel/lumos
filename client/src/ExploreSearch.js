import React from "react";

function ExploreSearch({ searchTerm, updateSearchTerm }) {
  return (
    <div className="searchbar flex flex-col mb-4 mx-auto w-1/2 text-center">
      <label htmlFor="search" className="searchbar-label font-bold mb-1">
        Filter by state, park name, etc:
      </label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={updateSearchTerm}
        className="searchbar-input px-4 py-2 border border-secondary rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default ExploreSearch;