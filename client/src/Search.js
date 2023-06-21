import React, { useState } from 'react';
import styled from 'styled-components';

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
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Enter city/state or zipcode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-button text-primary">Search</button>
      </Form>
      {error && <p>{error}</p>}
    </div>
  );
}

const SearchInput = styled.input`
  width: 210px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

export default Search;