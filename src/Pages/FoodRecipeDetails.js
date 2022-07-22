import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import { setResultsAction } from '../redux/Actions/index';
import Recomendation from '../Components/Recomendation';
import initLocalStorage from '../0 - Services/LocalStorage/LocalStorage';
import setArrayIngredients from '../0 - Services/Functions/setArrayIngredients';

function FoodRecipeDetails(props) {
  const { match: { params: { id } }, results, dispatchResults } = props;
  const history = useHistory();
  const { pathname } = history.location;

  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const [inProgress, setInProgress] = useState({});
  // console.log(inProgress);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('meal', 'lookup', 'i', id);
      dispatchResults(await oi.meals);
    }
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (!progressRecipe.meals) {
      initLocalStorage();
    }
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setInProgress(progressRecipe);
    setDoneRecipes(doneRecipe);
    fetchApi();
  }, []);

  useEffect(() => {
    doneRecipes.find((e) => e === id && setDone(true));
  }, [doneRecipes]);

  useEffect(() => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (!progressRecipe.meals) {
      const test = Object.keys(inProgress.meals);
      test.find((e) => e === id && setStarted(true));
    }
  }, [inProgress]);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('cocktail', 'search', 's', '');
      const n1 = 6;
      setRecomendation(await oi.drinks.slice(0, n1));
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const waitFunc = async () => {
      const waitFor = await setArrayIngredients(results);
      setIngredients(await waitFor);
    };
    waitFunc();
  }, [results]);

  const handleStartRecipe = () => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    progressRecipe.meals = { ...progressRecipe.meals, ...{ [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    history.push(`/foods/${id}/in-progress`);
  };

  const handleContinueRecipe = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div>
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ results[0].strMealThumb }
          alt="DrinkThumb"
        />
        <h2 data-testid="recipe-title">{results[0].strMeal}</h2>
        <p data-testid="recipe-category">{results[0].strCategory}</p>
        <div className="ingredient-container">
          {ingredients && ingredients.map((e, i) => (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              {e}
            </li>))}
        </div>
        <p data-testid="instructions">{results[0].strInstructions}</p>

        {results[0].strYoutube ? (<iframe
          data-testid="video"
          width="300"
          height="250"
          src={ results[0]?.strYoutube
            && results[0].strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          title="Embedded youtube"
        />) : null}
        <div className="recomendation-carousel">
          {recomendation.map((e, i) => (<Recomendation
            key={ i }
            index={ i }
            img={ e.strDrinkThumb }
            name={ e.strDrink }
          />))}
        </div>
        {done === false && started === false ? (
          <button
            onClick={ handleStartRecipe }
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
          >
            Start Recipe
          </button>
        ) : (
          <button
            onClick={ handleContinueRecipe }
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
          >
            Continue Recipe
          </button>)}
      </div>)
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

const mapStateToProps = (state) => ({
  results: state.page.setResults,
  setId: state.page.setId,
});

FoodRecipeDetails.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)).isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodRecipeDetails);
