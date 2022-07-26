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
import FavoriteButton from '../Components/FavoriteButton';

function RecipeDetails(props) {
  const { match: { params: { id } }, results, dispatchResults } = props;
  //   23
  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  const typeForApi = setLocalType(pathname);
  const typeForLocal = `${setLocalType(pathname)}s`;

  function getFoodsOrDrinks(string) {
    const numsStr = string.split('/');
    return numsStr[1];
  }
  const foodsOrDrinks = String(getFoodsOrDrinks(pathname));

  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      dispatchResults(await setApiType(pathname, id));
      setRecomendation(await setRecomendationApi(typeForApi));
    }
    fetchApi();

    const getInProgressLocal = getInProgress();
    if (!getInProgressLocal[typeForLocal]) {
      initProgressLocalStorage();
    } else {
      const test = Object.keys(getInProgressLocal[typeForLocal]);
      test.find((e) => e === id && setStarted(true));
    }

    const doneRecipe = initDoneLocalStorage();
    setDoneRecipes(doneRecipe);
  }, []);

  useEffect(() => {
    doneRecipes.find((e) => e === id && setDone(true));
  }, [doneRecipes]);

  useEffect(() => {
    const waitFunc = async () => {
      setIngredients(await setArrayIngredients(results));
    };
    waitFunc();
  }, [results]);

  useEffect(() => {
    async function fetchApi() {
      dispatchResults(await setApiType(pathname, id));
      setRecomendation(await setRecomendationApi(typeForApi));
    }
    fetchApi();
  }, [pathname]);

  const handleStartRecipe = () => {
    const getInProgressLocal = getInProgress();
    getInProgressLocal[typeForLocal] = {
      ...getInProgressLocal[typeForLocal], ...{ [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInProgressLocal));
    history.push(`/${foodsOrDrinks}/${id}/in-progress`);
  };

  const handleContinueRecipe = () => {
    history.push(`/${foodsOrDrinks}/${id}/in-progress`);
  };

  console.log(recomendation);
  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div className="details-main-container">
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ setSrcImage(results[0], typeForApi) }
          alt="Thumb"
        />
        <div className="details-title-container">
          <h2
            className="recipe-title"
            data-testid="recipe-title"
          >
            { setTextTitle(results[0], typeForApi)}

          </h2>
          <div>
            <ShareButton
              link={ `http://localhost:3000${pathname}` }
            />
            <FavoriteButton
              dataTest="favorite-btn"
              id={ id }
              results={ results }
              type={ typeForLocal }
            />
          </div>
        </div>
        <p data-testid="recipe-category">
          {setTextCategory(results[0], typeForApi)}
        </p>
        <div className="ingredient-container">
          <h4>Ingredients</h4>
          {ingredients && ingredients.map((e, i) => (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              {e}
            </li>))}
        </div>
        <h4>Instructions</h4>
        <p data-testid="instructions">{results[0].strInstructions}</p>
        <div className="video-container">
          {results[0].strYoutube ? (
            <div>
              <h4>Video</h4>
              <iframe
                data-testid="video"
                width="340"
                height="230"
                src={ results[0]?.strYoutube
            && results[0].strYoutube.replace('watch?v=', 'embed/') }
                frameBorder="0"
                title="Embedded youtube"
              />
            </div>
          ) : null}
        </div>
        <h4>Recomendation</h4>
        <div className="recomendation-carousel">
          {recomendation.map((e, i) => (
            <Recomendation
              results={ recomendation }
              key={ i }
              index={ i }
              img={ setSrcImgRecomendation(e, typeForApi) }
              name={ setTextRecomendation(e, typeForApi) }
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
