import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setResultsAction } from '../redux/Actions/index';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';

function CategoriesButtons({ dispatchResults }) {
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [counter, setCounter] = useState(0);

  const getCategories = async () => {
    if (history.location.pathname === '/drinks') {
      const requestCategories = await fetchRecipeInfos('cocktail', 'list', 'c', 'list');
      setCategories(requestCategories.drinks);
    }
    if (history.location.pathname === '/foods') {
      const requestCategories = await fetchRecipeInfos('meal', 'list', 'c', 'list');
      setCategories(requestCategories.meals);
    }
  };
  const defaultFetch = async () => {
    if (history.location.pathname === '/drinks') {
      const oi = await fetchRecipeInfos('cocktail', 'search', 's', '');
      dispatchResults(await oi.drinks);
    }
    if (history.location.pathname === '/foods') {
      const oi = await fetchRecipeInfos('meal', 'search', 's', '');
      dispatchResults(await oi.meals);
    }
  };

  const resetButton = (valor) => {
    let possibilidades = '';
    setCounter(counter + 1);
    possibilidades = `${valor}${counter}`;
    if (possibilidades === `${valor}1`) {
      setCounter(0);
      possibilidades = '';
      defaultFetch();
    }
  };

  const handleClick = async ({ target: { value } }) => {
    if (history.location.pathname === '/drinks') {
      const requestCategories = await fetchRecipeInfos(
        'cocktail', 'filter', 'c', value,
      );
      resetButton(value);
      dispatchResults(await requestCategories.drinks);
    }
    if (history.location.pathname === '/foods') {
      const requestCategories = await fetchRecipeInfos('meal', 'filter', 'c', value);
      resetButton(value);
      dispatchResults(await requestCategories.meals);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const mN = 5;
  return (
    <div>
      <button
        className="category-btn"
        type="button"
        data-testid="All-category-filter"
        onClick={ defaultFetch }
      >
        All

      </button>
      {categories && categories.slice(0, mN).map((e, i) => (
        <button
          key={ i }
          type="button"
          className="category-btn "
          data-testid={ `${e.strCategory}-category-filter` }
          onClick={ handleClick }
          value={ e.strCategory }
        >
          {e.strCategory}

        </button>
      ))}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

CategoriesButtons.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CategoriesButtons);
