import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import { setResultsAction } from '../redux/Actions/index';
// import Recomendation from './Recomendation';

function RecipeInProgress(props) {
  const { match: { params: { id } }, results, dispatchResults } = props;
  const [ingredients, setIngredients] = useState([]);
  // const [recomendation, setRecomendation] = useState([]);
  const [finishRecipe, setFinishRecipe] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('cocktail', 'lookup', 'i', id);
      dispatchResults(await oi.drinks);
    }
    fetchApi();
  }, []);

  // useEffect(() => {
  //   async function fetchApi() {
  //     const oi = await fetchRecipeInfos('meal', 'search', 's', '');
  //     const n1 = 6;
  //     setRecomendation(await oi.meals.slice(0, n1));
  //   }
  //   fetchApi();
  // }, []);

  useEffect(() => {
    const setArrayIngredients = async () => {
      const n1 = 17;
      const n2 = 31;
      const n3 = 32;
      const n4 = 46;
      if (results.length !== 0) {
        const arrayIngredients = await Object.values(results[0]).slice(n1, n2);
        const filterIngredients = arrayIngredients.filter((e) => e !== '' && e !== null);
        const arrayMedidas = await Object.values(results[0]).slice(n3, n4);
        const filterMedidas = arrayMedidas.filter((e) => e !== '' && e !== null);
        const arrayNovo = [];
        filterIngredients.forEach((e, i) => {
          arrayNovo.push(`${filterMedidas[i]} - ${e}`);
        });
        setIngredients(arrayNovo);
      }
    };
    setArrayIngredients();
  }, [results]);

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
          {ingredients.map((e, i) => (
            <label key={ i } htmlFor="ingredient">
              <input
                id="ingredient"
                type="checkbox"
                data-testid={ `${i}-ingredient-step` }
                value={ e }
              />
              {e}
            </label>
          ))}
        </div>
        <p data-testid="instructions">{results[0].strInstructions}</p>
        {/* <div className="recomendation-carousel">
          {recomendation.map((e, i) => (<Recomendation
            datatest={ `${i}-recomendation-card` }
            key={ i }
            index={ i }
            img={ e.strMealThumb }
            name={ e.strMeal }
          />))}
        </div> */}
        <button
          onClick={ handleFinishRecipe }
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </div>)
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

const mapStateToProps = (state) => ({
  results: state.page.setResults,
});

RecipeInProgress.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)).isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
