import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import { setResultsAction } from '../redux/Actions/index';

function FoodRecipeDetails(props) {
  console.log(props);
  const { match: { params: { id } }, results, dispatchResults } = props;

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('meal', 'lookup', 'i', id);
      dispatchResults(await oi.meals);
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

  console.log(results);
  return (
    results.length === 0 ? <h1>Loading</h1> : (
      <div>
        <h1>{id}</h1>
        <img
          data-testid="recipe-photo"
          src={ results[0].strMealThumb }
          alt="DrinkThumb"
        />
        <h2 data-testid="recipe-title">{results[0].strMeal}</h2>
        <p data-testid="recipe-category">{results[0].strCategory}</p>
        {ingredients.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {e}
          </li>))}
        <p data-testid="instructions">{results[0].strInstructions}</p>

        <iframe
          data-testid="video"
          width="360"
          height="300"
          src={ results[0].strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          title="Embedded youtube"
        />
        {/* <div data-testid="${}-recomendation-card">
          COLOCAR CARD
        </div> */}

      </div>)
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

const mapStateToProps = (state) => ({
  results: state.page.setResults,
});

FoodRecipeDetails.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)).isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodRecipeDetails);
