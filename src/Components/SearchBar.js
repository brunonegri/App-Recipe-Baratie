import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setResultsAction } from '../redux/Actions/index';
import { fetchRecipeInfos, fetchSearch } from '../0 - Services/API/requestAPI';

function SearchBar({ type, dispatchResults }) {
  const history = useHistory();
  const [filterSearch, setFilterSearch] = useState({});
  const [filterResults, setFilterResults] = useState([]);
  console.log(filterResults);

  const handleSelect = ({ target: { value, name } }) => {
    setFilterSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const oneResult = async () => {
    if (type === 'meal') {
      const { meals } = await filterResults;
      if (meals.length === 1) {
        history.push(`/foods/${meals[0].idMeal}`);
      }
    } else {
      const { drinks } = await filterResults;
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
      }
    }
  };

  useEffect(() => {
    dispatchResults(filterResults);
  }, [filterResults]);

  const handleClick = async () => {
    const { filter, search } = filterSearch;
    console.log(filterSearch);
    if (filter === 'ingredient-search') {
      const oi = await fetchRecipeInfos(type, 'filter', 'i', search);
      setFilterResults(await fetchSearch(oi));
      oneResult();
      return oi;
    } if (filter === 'name-search') {
      const oi = await fetchRecipeInfos(type, 'search', 's', search);
      setFilterResults(await fetchSearch(oi));
      await oneResult();
      return oi;
    } if (filter === 'first-letter') {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const oi = await fetchRecipeInfos(type, 'search', 'f', search);
      setFilterResults(await fetchSearch(oi));
      return oi;
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
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
  dispatchResults: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
