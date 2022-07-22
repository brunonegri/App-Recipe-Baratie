import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { setResultsAction } from '../redux/Actions/index';
import Recomendation from '../Components/Recomendation';
import { initDoneLocalStorage,
  initProgressLocalStorage,
  getInProgress } from '../0 - Services/LocalStorage/LocalStorage';
import setArrayIngredients from '../0 - Services/Functions/setArrayIngredients';
import setApiType from '../0 - Services/Functions/setApiType';
import setLocalType from '../0 - Services/Functions/setType';
import setRecomendationApi from '../0 - Services/Functions/setRecomendation';
import {
  setSrcImage,
  setSrcImgRecomendation,
  setTextCategory,
  setTextRecomendation,
  setTextTitle } from '../0 - Services/Functions/conditionalRender';
import ShareButton from '../Components/ShareButton';

function RecipeDetails(props) {
  const { match: { params: { id } }, results, dispatchResults } = props;
  //   23
  const history = useHistory();
  const { pathname } = history.location;
  const type = setLocalType(pathname);

  function getFoodsOrDrinks(string) {
    const numsStr = string.split('/');
    return numsStr[1];
  }
  const foodsOrDrinks = String(getFoodsOrDrinks(pathname));

  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const [inProgress, setInProgress] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [started, setStarted] = useState(false);
  console.log(started);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      dispatchResults(await setApiType(pathname, id));
      setRecomendation(await setRecomendationApi(type));
    }
    fetchApi();

    const getInProgressLocal = getInProgress();
    if (!getInProgressLocal[type]) {
      initProgressLocalStorage(type, id);
    }

    const doneRecipe = initDoneLocalStorage();
    setInProgress(getInProgressLocal);
    setDoneRecipes(doneRecipe);
  }, []);

  useEffect(() => {
    doneRecipes.find((e) => e === id && setDone(true));
  }, [doneRecipes]);

  useEffect(() => {
    const getInProgressLocal = getInProgress();
    if (!getInProgressLocal[type]) {
      const test = Object.keys(inProgress[type]);
      test.find((e) => e === id && setStarted(true));
    }
  }, [inProgress]);

  useEffect(() => {
    const waitFunc = async () => {
      setIngredients(await setArrayIngredients(results));
    };
    waitFunc();
  }, [results]);

  const handleStartRecipe = () => {
    const getInProgressLocal = getInProgress();
    getInProgressLocal[type] = { ...getInProgressLocal[type], ...{ [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInProgressLocal));
    history.push(`/${foodsOrDrinks}/${id}/in-progress`);
  };

  const handleContinueRecipe = () => {
    history.push(`/${foodsOrDrinks}/${id}/in-progress`);
  };
  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div>
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ setSrcImage(results[0], type) }
          alt="Thumb"
        />
        <h2 data-testid="recipe-title">{ setTextTitle(results[0], type)}</h2>
        <ShareButton
          link={ `http://localhost:3000${pathname}` }
        />
        <button data-testid="favorite-btn" type="button">Favorite</button>
        <p data-testid="recipe-category">
          {setTextCategory(results[0], type)}
        </p>
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
          {recomendation.map((e, i) => (
            <Recomendation
              key={ i }
              index={ i }
              img={ setSrcImgRecomendation(e, type) }
              name={ setTextRecomendation(e, type) }
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
});

RecipeDetails.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)).isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
