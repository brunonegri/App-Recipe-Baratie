import React, { useEffect } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { setResultsAction } from '../redux/Actions/index';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipe from '../Components/Recipe';
import { fetchRecipeInfos, fetchSearch } from '../0 - Services/API/requestAPI';

function MainScreen({ results, type, dispatchResults }) {
  // const [recipes, setRecipes] = useState(results);

  useEffect(() => {
    const fetchApi = async () => {
      const oi = await fetchRecipeInfos(type, 'search', 's', '');
      dispatchResults(await fetchSearch(await oi));
    };
    fetchApi();
    console.log(results);
  }, [type]);

  // const validate = results.meals.length > 1;
  return (
    <div className="container-recipes">
      <Header />
      {results.length === 0 ? <h1>oi</h1> : results.meals.map((e, i) => (<Recipe
        key={ i }
        index={ i }
        name={ e.strMeal }
        img={ e.strMealThumb }
      />))}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  results: state.page.setResults,
  type: state.page.setApi,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

MainScreen.propTypes = {
  results: PropTypes.arrayOf(PropTypes.objectOf(any).isRequired).isRequired,
  type: PropTypes.string.isRequired,
  dispatchResults: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

//   results !== undefined && results.drinks.map((e, i) => (<Recipe
//     key={ i }
//     name={ e.strDrink }
//     img={ e.strDrinkThumb }
//  )
