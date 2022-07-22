import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import { setResultsAction } from '../redux/Actions/index';
import setArrayIngredients from '../0 - Services/Functions/setArrayIngredients';
import initLocalStorage from '../0 - Services/LocalStorage/LocalStorage';

function RecipeInProgress(props) {
  const history = useHistory();
  const { results, dispatchResults } = props;
  const stringLocation = history.location.pathname;
  function apenasNumeros(string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }
  const id = String(apenasNumeros(stringLocation));

  const [ingredients, setIngredients] = useState([]);
  const [finishRecipe, setFinishRecipe] = useState(false);
  const [inProgress, setInProgress] = useState([]);
  const [disable, setDisable] = useState(false);
  // console.log(inProgress);
  // const [checkboxCounter, setCheckboxCounter] = useState(0);

  useEffect(() => {
    async function fetchApi() {
      if (history.location.pathname === `/drinks/${id}/in-progress`) {
        const oi = await fetchRecipeInfos('cocktail', 'lookup', 'i', id);
        dispatchResults(await oi.drinks);
      }
      if (history.location.pathname === `/foods/${id}/in-progress`) {
        const oi = await fetchRecipeInfos('meal', 'lookup', 'i', id);
        dispatchResults(await oi.meals);
      }
    }
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (!progressRecipe.meals) {
      initLocalStorage(null, id);
    }
    setInProgress(progressRecipe);
    fetchApi();
  }, []);

  useEffect(() => {
    const waitFunc = async () => {
      const waitFor = await setArrayIngredients(results);
      setIngredients(await waitFor);
    };
    waitFunc();
  }, [results]);

  useEffect(() => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (!progressRecipe) {
      inProgress.meals[id].length === ingredients.length
       && setDisable(true);
    }
  });

  const handleCheckbox = (event) => {
    console.log(event);
    const { target } = event;
    console.log(target);
    const { value } = target;
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    progressRecipe.meals[id].push(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    console.log(value);
  };

  const handleFinishRecipe = () => {
    setFinishRecipe(!finishRecipe);
  };

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
                // checked={ inProgress.meals[id] && inProgress.meals[id].some((element) => (
                //   element === e
                // )) }
              />
              {e}
            </label>
          ))}
        </div>
        <p data-testid="instructions">{results[0].strInstructions}</p>
        <button
          disabled={ disable }
          onClick={ handleFinishRecipe }
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
