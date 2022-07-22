import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setApiType from '../0 - Services/Functions/setApiType';
import setLocalType from '../0 - Services/Functions/setType';
import { setResultsAction } from '../redux/Actions/index';
import setArrayIngredients from '../0 - Services/Functions/setArrayIngredients';
import { initProgressLocalStorage,
  getInProgress } from '../0 - Services/LocalStorage/LocalStorage';

function RecipeInProgress(props) {
  const { results, dispatchResults } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const type = setLocalType(pathname);

  function apenasNumeros(string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }
  const id = String(apenasNumeros(pathname));

  const [ingredients, setIngredients] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      dispatchResults(await setApiType(pathname, id));
    }
    const getInProgressLocal = getInProgress();
    const setLocalStorage = () => {
      if (!getInProgressLocal[type]) {
        initProgressLocalStorage(type, id);
      }
    };
    setLocalStorage();

    setInProgress(getInProgressLocal);
    fetchApi();
  }, []);

  useEffect(() => {
    const waitFunc = async () => {
      const waitFor = await setArrayIngredients(results);
      setIngredients(await waitFor);
    };
    waitFunc();
  }, [results]);

  const handleCheckbox = (event) => {
    const getInProgressLocal = getInProgress();
    const { target } = event;
    const { value } = target;
    getInProgressLocal[type][id].push(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInProgressLocal));
  };

  console.log(results);
  console.log(inProgress);

  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div>
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ results[0].strDrinkThumb || results[0].strMealThumb }
          alt="DrinkThumb"
        />
        <h2 data-testid="recipe-title">{results[0].strDrink || results[0].strMeal}</h2>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorite</button>
        <p data-testid="recipe-category">
          {results[0].strAlcoholic || results[0].strCategory}
        </p>
        <div className="ingredient-container">
          {ingredients && ingredients.map((e, i) => (
            <label key={ i } htmlFor="ingredient" data-testid={ `${i}-ingredient-step` }>
              <input
                onClick={ handleCheckbox }
                id="ingredient"
                type="checkbox"
                value={ e }
                checked={ inProgress[type] && inProgress[type][id].includes(e) }
              />
              {e}
            </label>
          ))}
        </div>
        <p data-testid="instructions">{results[0].strInstructions}</p>
        <button
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finish Recipe
        </button>
      </div>)
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

const mapStateToProps = (state) => ({
  results: state.page.setResults,
  id: state.page.setId,
});

RecipeInProgress.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
