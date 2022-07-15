import React, { useState } from 'react';
import fetchRecipeInfos from '../0 - Services/API/requestAPI'
import { connect } from 'react-redux'

function SearchBar() {
  const [filterSearch, setFilterSearch] = useState({});

  const handleSelect = ({ target: { value, name } }) => {
    setFilterSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleClick = () => {
    const { meal } = this.props
    const { filter, search } = filterSearch;
    if(filter === 'ingredient-search' ) {
      const oi = fetchRecipeInfos(meal, 'filter', 'i', search);
      console.log(oi)
    }
  }
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
        onClick={ handleClick }
      >
        Search

      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  meal: state.page.meal,
});

export default connect(mapStateToProps)(SearchBar);
