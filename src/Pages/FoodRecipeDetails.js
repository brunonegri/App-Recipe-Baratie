import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import { setResultsAction, setIdAction } from '../redux/Actions/index';
import Recomendation from '../Components/Recomendation';

function FoodRecipeDetails(props) {
  const { match: { params: { id } }, results, dispatchResults, dispatchId } = props;
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const [doneRecipes, setDoneRecipes] = useState([]);
  // const [inProgressRecipe, setInProgressRecipe] = useState([]);

  // const [started, setStarted] = useState(false);
  // const [inProgress, setInProgress] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('meal', 'lookup', 'i', id);
      dispatchResults(await oi.meals);
    }
    dispatchId(id);

    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    // const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    // setInProgressRecipe(progressRecipe);
    setDoneRecipes(doneRecipe);
    fetchApi();
  }, []);

  useEffect(() => {
    doneRecipes.find((e) => e === id && setDone(true));
  }, [doneRecipes]);

  // useEffect(() => {
  //   inProgressRecipe.find((e) => e === id && setStarted(true));
  // }, [inProgressRecipe]);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('cocktail', 'search', 's', '');
      const n1 = 6;
      setRecomendation(await oi.drinks.slice(0, n1));
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const setArrayIngredients = async () => {
      const n1 = 9;
      const n2 = 28;
      const n3 = 29;
      const n4 = 48;
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

  const handleStartRecipe = () => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    console.log(progressRecipe);
    progressRecipe.push(id);
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    const { history } = props;
    history.push(`/foods/${id}/in-progress`);
  };

  // const handleDoneRecipe = () => {
  //   const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  //   console.log(progressRecipe);
  //   progressRecipe.push(id);
  //   localStorage.setItem('doneRecipes', JSON.stringify(progressRecipe));
  //   setDoneRecipes(progressRecipe);
  // };

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
          {ingredients.map((e, i) => (done !== true ? (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              {e}
            </li>)
            : (
              <label key={ i } htmlFor="ingredient">
                <input
                  id="ingredient"
                  type="checkbox"
                  data-testid={ `${i}-ingredient-step` }
                  value={ e }
                />
                {e}
              </label>
            )
          ))}
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

        <button
          onClick={ handleStartRecipe }
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
        {/* {done === false && (
          <button
            className="start-recipe-btn"
            type="button"
          >
            Continue Recipe
          </button>)} */}
      </div>)
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
  dispatchId: (id) => dispatch(setIdAction(id)),
});

const mapStateToProps = (state) => ({
  results: state.page.setResults,
});

FoodRecipeDetails.propTypes = {
  dispatchId: PropTypes.func.isRequired,
  dispatchResults: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)).isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodRecipeDetails);
