import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setResultsAction } from '../redux/Actions/index';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';

function CategoriesButtons({ dispatchResults }) {
  const history = useHistory();
  const [categories, setCategories] = useState();
  //   const [click, setClick] = useState({});

  const getCategories = async () => {
    if (history.location.pathname === '/drinks') {
      const requestCategories = await fetchRecipeInfos('cocktail', 'list', 'c', 'list');
      setCategories(requestCategories.drinks);
      console.log(categories);
    }
    if (history.location.pathname === '/foods') {
      const requestCategories = await fetchRecipeInfos('meal', 'list', 'c', 'list');
      setCategories(requestCategories.meals);
      console.log(categories);
    }
  };

  const handleClick = async ({ target: { value } }) => {
    if (history.location.pathname === '/drinks') {
      console.log(value);
      const requestCategories = await fetchRecipeInfos(
        'cocktail', 'filter', 'c', value,
      );
      //   setClick(!click);
      dispatchResults(await requestCategories.drinks);
    }
    if (history.location.pathname === '/foods') {
      console.log(value);
      const requestCategories = await fetchRecipeInfos('meal', 'filter', 'c', value);
      //   setClick(!click);
      dispatchResults(await requestCategories.meals);
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

  useEffect(() => {
    getCategories();
  }, []);

  //   useEffect(() => {
  //     if (click === false) {
  //       defaultFetch();
  //     }
  //   }, [click]);

  const mN = 5;
  return (
    <div>
      <button
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
