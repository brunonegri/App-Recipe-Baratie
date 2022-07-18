import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';

function SearchBar({ type }) {
  const [filterSearch, setFilterSearch] = useState({});

  const handleSelect = ({ target: { value, name } }) => {
    setFilterSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const { filter, search } = filterSearch;
    console.log(filterSearch);
    if (filter === 'ingredient-search') {
      const oi = await fetchRecipeInfos(type, 'filter', 'i', search);
      console.log(oi);
      return oi;
    } if (filter === 'name-search') {
      const oi = await fetchRecipeInfos(type, 'search', 's', search);
      console.log(oi);
      return oi;
    } if (filter === 'first-letter') {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const oi = await fetchRecipeInfos(type, 'search', 'f', search);
      console.log(oi);
      return oi;
    }
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
          value="first-letter"
          onChange={ handleSelect }
        />
        First Letter

      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search

      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  type: state.page.setApi,
});

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(SearchBar);
