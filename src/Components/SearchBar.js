import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setResultsAction } from '../redux/Actions/index';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';

function SearchBar({ results, type, dispatchResults }) {
  const [filterSearch, setFilterSearch] = useState({});
  const [filterResults, setFilterResults] = useState(results);
  // console.log(filterResults);

  const handleSelect = ({ target: { value, name } }) => {
    setFilterSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const errorNull = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    dispatchResults(filterResults);
  }, [filterResults]);

  const ingredientSearch = async (search) => {
    const oi = await fetchRecipeInfos(type, 'filter', 'i', search);
    // ? verifica se esta vazio.
    if (!(oi?.meals || oi?.drinks)) {
      console.log(oi);
      global.alert(errorNull);
    }
    setFilterResults(oi.drinks || oi.meals);
  };

  const nameSearch = async (search) => {
    const oi = await fetchRecipeInfos(type, 'search', 's', search);
    if (!(oi?.meals || oi?.drinks)) {
      global.alert(errorNull);
    }
    console.log(oi);
    setFilterResults(oi.drinks || oi.meals);
  };

  const firstLetterFilter = async (search) => {
    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const oi = await fetchRecipeInfos(type, 'search', 'f', search);
    if (!(oi?.meals || oi?.drinks)) {
      global.alert(errorNull);
    }
    setFilterResults(oi.drinks || oi.meals);
  };

  const handleClick = async () => {
    const { filter, search } = filterSearch;
    console.log(filterSearch);
    if (filter === 'ingredient-search') {
      ingredientSearch(search);
    }
    if (filter === 'name-search') {
      nameSearch(search);
    }
    if (filter === 'first-letter') {
      firstLetterFilter(search);
    }
  };
  return (
    <form>
      <input
        name="search"
        type="text"
        data-testid="search-input"
        placeholder="Search"
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
  results: state.page.setResults,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatchResults: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
