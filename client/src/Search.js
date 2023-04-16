import React, { useState } from 'react';

function Search({ handleSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city/state or zipcode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Search;