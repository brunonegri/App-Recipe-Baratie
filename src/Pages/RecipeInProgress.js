import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setApiType from '../0 - Services/Functions/setApiType';
import setLocalType from '../0 - Services/Functions/setType';
import { setResultsAction } from '../redux/Actions/index';
import setArrayIngredients from '../0 - Services/Functions/setArrayIngredients';
import { initProgressLocalStorage,
  getInProgress,
  remIngridientLocalStorage,
  addDoneRecipeLocalStorage,
} from '../0 - Services/LocalStorage/LocalStorage';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';

function RecipeInProgress(props) {
  const { results, dispatchResults } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const typeForLocal = `${setLocalType(pathname)}s`;

  function apenasNumeros(string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }
  const id = String(apenasNumeros(pathname));

  const [ingredients, setIngredients] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function fetchApi() {
      dispatchResults(await setApiType(pathname, id));
    }
    fetchApi();

    const defaultLocalStorage = () => {
      const getInProgressLocal = getInProgress();
      // console.log(getInProgressLocal);
      if (!getInProgressLocal[typeForLocal]) {
        initProgressLocalStorage(typeForLocal, id);
      }
    };
    defaultLocalStorage();
    const getInProgressLocal = getInProgress();
    setCounter(getInProgressLocal[typeForLocal][id].length);
  }, []);

  useEffect(() => {
    const waitFunc = async () => {
      const waitFor = await setArrayIngredients(results);
      setIngredients(await waitFor);
    };
    waitFunc();
  }, [results]);

  useEffect(() => {
    if (counter === ingredients.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [counter]);

  const getInProgressLocal = getInProgress();

  const handleCheckbox = ({ target }) => {
    const { value } = target;
    if (getInProgressLocal[typeForLocal][id].includes(value)) {
      remIngridientLocalStorage(typeForLocal, id, value);
      const acc = counter - 1;
      setCounter(acc);
    } else {
      getInProgressLocal[typeForLocal][id].push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify(getInProgressLocal));
      const acc = counter + 1;
      setCounter(acc);
    }
  };
  const dt = new Date();
  const date = `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}`;
  console.log(date);

  const handleFinishBtn = () => {
    addDoneRecipeLocalStorage(typeForLocal, results[0], date);
    history.push('/done-recipes');
  };

  console.log(results);
  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div className="details-main-container">
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ results[0].strDrinkThumb || results[0].strMealThumb }
          alt="DrinkThumb"
        />
        <div className="details-title-container">
          <h2 data-testid="recipe-title">{results[0].strDrink || results[0].strMeal}</h2>
          <div>
            <ShareButton
              link={ `http://localhost:3000${pathname.replace('/in-progress', '')}` }
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
          {results[0].strAlcoholic || results[0].strCategory}
        </p>
        <div className="ingredient-container">
          <h4>Ingredients</h4>
          {ingredients && ingredients.map((e, i) => (
            <label key={ i } htmlFor="ingredient" data-testid={ `${i}-ingredient-step` }>
              <input
                onChange={ handleCheckbox }
                id="ingredient"
                type="checkbox"
                value={ e }
                checked={ getInProgressLocal[typeForLocal][id]
                  && getInProgressLocal[typeForLocal][id]?.includes(e) }
              />
              {e}
            </label>
          ))}
        </div>
        <div className="instructions-container">
          <h4>Instructions</h4>
          <p data-testid="instructions">{results[0].strInstructions}</p>
        </div>
        <button
          className="start-recipe-btn"
          onClick={ handleFinishBtn }
          data-testid="finish-recipe-btn"
          disabled={ disabled }
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
