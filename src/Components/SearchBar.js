import React, { useState } from 'react';

function SearchBar() {
  const [filterSearch, setFilterSearch] = useState({});

  const handleSelect = ({ target: { value, name } }) => {
    setFilterSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form>
      <input
        name="search"
        type="text"
        data-testid="search-input"
        onChange={ handleSelect }
      />
      <label htmlFor="ingredient-search">

        <input
          id="ingredient-search"
          name="filter"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient-search"
          onChange={ handleSelect }
        />
        Ingredient

      </label>

      <label htmlFor="name-search">
        <input
          id="name-search"
          name="filter"
          type="radio"
          data-testid="name-search-radio"
          value="name-search"
          onChange={ handleSelect }
        />
        Name

      </label>

      <label htmlFor="first-letter">

        <input
          id="first-letter"
          name="filter"
          type="radio"
          data-testid="first-letter-search-radio"
          value="fisrt-letter"
          onChange={ handleSelect }
        />
        First Letter

      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => console.log(filterSearch) }
      >
        Search

      </button>
    </form>
  );
}

export default SearchBar;
