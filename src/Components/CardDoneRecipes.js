import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes({ results, index }) {
//   console.log(results[index]);
  const history = useHistory();
  const [linkCopied, setLinkCopied] = useState(false);
  //   const [tags, setTags] = useState('');
  const [topText, setTopText] = useState('');

  useEffect(() => {
    // const splitTags = results[index].tags?.split(',');
    if (results[index].type === 'food') {
      const mergeText = `${results[index].nationality} - ${results[index].category}`;
      setTopText(mergeText);
    } else {
      const mergeText = `${results[index].alcoholicOrNot} - ${results[index].category}`;
      setTopText(mergeText);
    }
    // setTags(splitTags);
  }, []);

  //   console.log(tags);

  const handleClickShare = () => {
    if (results[index].type === 'food') {
      const link = (`http://localhost:3000/foods/${results[index].id}`);
      clipboardCopy(link);
      setLinkCopied(!linkCopied);
    } else {
      const link = (`http://localhost:3000/drinks/${results[index].id}`);
      clipboardCopy(link);
      setLinkCopied(!linkCopied);
    }
  };

  const handleClickRecipe = () => {
    if (results[index].type === 'food') {
      history.push(`/foods/${results[index].id}`);
    } else {
      history.push(`/drinks/${results[index].id}`);
    }
  };

  return (
    <div>
      <div key={ index }>
        <button type="button" onClick={ handleClickRecipe }>

          <img
            className="card-image"
            src={ results[index].image }
            alt="card-recipes-done"
            data-testid={ `${index}-horizontal-image` }
          />
        </button>

        <p data-testid={ `${index}-horizontal-top-text` }>
          {topText}
        </p>
        <button type="button" onClick={ handleClickRecipe }>
          <p data-testid={ `${index}-horizontal-name` }>
            { results[index].name }
          </p>
        </button>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { results[index].doneDate }
        </p>
        <div>
          <button
            type="button"
            onClick={ handleClickShare }
          >
            <img
              src={ shareIcon }
              alt="Icone de Compartilhamento"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {linkCopied && <p>Link copied!</p>}
        </div>
        <div key={ index }>
          <span data-testid={ `${index}-${index}-horizontal-tag` }>
            {results[index].tags}
          </span>
        </div>
        {/* {tags?.map((e, i) => (
          <div>
            <span data-testid={ `${i}-${e}-horizontal-tag` }>
              {e}
            </span>
          </div>
        ))} */}

      </div>
    </div>
  );
}

CardDoneRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default CardDoneRecipes;
