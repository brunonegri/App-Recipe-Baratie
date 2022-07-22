import React from 'react';

function DoneRecipes() {
  /* const [doneRecipes, setDoneRecipes] = useState([]); */

  /*  useEffect(() => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  }, []); */

  return (
    <div>
      <div key={ index }>
        <img
          src={ image }
          alt="card-recipes-done"
          data-testid={ `${index}-horizontal-image` }
        />

        <p data-testid={ `${index}-horizontal-top-text` }>
          {category}
        </p>

        <p data-testid={ `${index}-horizontal-name` }>
          { Name }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </p>

        <button
          type="button"
          // onClick={ () => {}} COPY
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share-url"
          />
        </button>
        <div key={ idx }>
          <p data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </p>
        </div>

      </div>
    </div>
  );
}

export default DoneRecipes;
