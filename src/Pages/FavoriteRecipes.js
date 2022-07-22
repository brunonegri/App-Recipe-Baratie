import { React, useEffect } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(getFavorite);
  }, []);
  // criar função de filtro usando setFavoriteRecipes...
  /* const filterFavoriteRecipes = (e) => {
    const filteredRecipes = favoriteRecipes.filter((e) => {

    });
    setFavoriteRecipes(filteredRecipes);
  }; */

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      /*  onClick={ () => {} } */
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      /*  onClick={ () => {} } */
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      /*  onClick={ () => {} } */
      >
        Drink
      </button>
      {favoriteRecipes && favoriteRecipes.map((element, index) => (
        <div key={ index }>
          <img
            src={ element.image }
            alt="foodImage"
            data-testid={ `${index}-horizontal-image` } // imagem do card de receita
          />
          <p
            data-testid={ `${index}-horizontal-top-text` } // texto da categoria
          >
            {element.category}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` } // texto do nome da receita
          >
            {element.name}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>

            {element.doneDate}

          </p>
          <button
            src={ shareIcon }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` } // icone de compartilhar
          /* onClick={ () => {} */
          >
            <img src={ imageShare } alt="sla" />
          </button>
          <div key={ index }>
            <p data-testid={ `${index}-${element.tag}-horizontal-tag` } />
          </div>
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;
