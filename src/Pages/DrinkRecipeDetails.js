import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import { setResultsAction } from '../redux/Actions/index';
import Recomendation from '../Components/Recomendation';

function DrinkRecipeDetails(props) {
  const { match: { params: { id } }, results, dispatchResults } = props;
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('cocktail', 'lookup', 'i', id);
      dispatchResults(await oi.drinks);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('meal', 'search', 's', '');
      const n1 = 6;
      setRecomendation(await oi.meals.slice(0, n1));
    }
    fetchApi();
  }, []);

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
        // console.log(Object.values(results[0]));
        setIngredients(arrayNovo);
      }
      // const test = await results[0].map((e) => console.log(e));
      // const test2 = await Object.entries(results[0]);
      // console.log(test2);
    };
    setArrayIngredients();
  }, [results]);

  // console.log(recomendation);
  // console.log(results[0]);

  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div>
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ results[0].strDrinkThumb }
          alt="DrinkThumb"
        />
        <h2 data-testid="recipe-title">{results[0].strDrink}</h2>
        <p>{results[0].strCategory}</p>
        <p data-testid="recipe-category">{results[0].strAlcoholic}</p>
        {ingredients.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {e}
          </li>))}
        <p data-testid="instructions">{results[0].strInstructions}</p>
        <div className="recomendation-carousel">
          {recomendation.map((e, i) => (<Recomendation
            datatest={ `${i}-recomendation-card` }
            key={ i }
            index={ i }
            img={ e.strMealThumb }
            name={ e.strMeal }
          />))}
        </div>
      </div>)
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

const mapStateToProps = (state) => ({
  results: state.page.setResults,
});

DrinkRecipeDetails.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)).isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinkRecipeDetails);
