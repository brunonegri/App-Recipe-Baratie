import React, { useEffect } from 'react';
import Link from 'react-router-dom';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(getDone);
  }, []);

  return (
    <div>
      <div className="done-recipes-container">
        {doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                width="150px"
                className="done-recipe-img"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            {recipe.type === 'comida'
          && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.area} - ${recipe.category}`}
            </p>)}
            {recipe.type === 'bebida'
          && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.alcoholicOrNot}`}
            </p>)}
            <div>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <h3
                  className="done-recipe-title"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h3>
              </Link>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Feita em:
              {' '}
              { recipe.doneDate }
            </p>
            {copied
              ? <span>Link copiado!</span>
              : (
                <input
                  type="image"
                  src={ shareIcon }
                  alt="shareIcon"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copieLink(`${recipe.type}s/${recipe.id}`) }
                />
              )}
            <div key={ `${tag}-${i}` }>
              <span data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
