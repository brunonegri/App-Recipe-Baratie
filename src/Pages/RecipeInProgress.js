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
  remIngridientLocalStorage } from '../0 - Services/LocalStorage/LocalStorage';
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
  const [checked, setChecked] = useState({});
  console.log(checked);

  useEffect(() => {
    async function fetchApi() {
      dispatchResults(await setApiType(pathname, id));
    }
    fetchApi();

    const defaultLocalStorage = () => {
      const getInProgressLocal = getInProgress();
      console.log(getInProgressLocal);
      if (!getInProgressLocal[typeForLocal]) {
        initProgressLocalStorage(typeForLocal, id);
      }
    };
    defaultLocalStorage();
  }, []);

  useEffect(() => {
    const waitFunc = async () => {
      const waitFor = await setArrayIngredients(results);
      setIngredients(await waitFor);
    };
    waitFunc();
    ingredients?.map((e) => checked[e] = false);
  }, [results]);

  const getInProgressLocal = getInProgress();

  const handleCheckbox = ({ target: { value } }) => {
    console.log(value);
    // remIngridientLocalStorage(typeForLocal, id, value);

    // if (getInProgressLocal && getInProgressLocal[typeForLocal][id].includes(value)) {
    //   remIngridientLocalStorage(typeForLocal, id, value);
    //   setChecked(checked[value] = true);
    // }
    getInProgressLocal[typeForLocal][id].push(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInProgressLocal));
  };
  // fav func
  // const handleClick = () => {
  //   if (favorite) {
  //     remFavLocalStorage(id);
  //   } else {
  //     addFavLocalStorage(type, results[0]);
  //   }
  //   setFavorite(!favorite);
  // };

  console.log(results);
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
        <ShareButton
          link={ `http://localhost:3000${pathname.replace('/in-progress', '')}` }
        />
        <FavoriteButton id={ id } results={ results } type={ typeForLocal } />
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
                // checked={ check(e) }
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
