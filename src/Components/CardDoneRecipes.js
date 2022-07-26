import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes({ results, index }) {
//   console.log(results[index]);
  const history = useHistory();
  const [linkCopied, setLinkCopied] = useState(false);
  const [topText, setTopText] = useState('');

  useEffect(() => {
    if (results[index].type === 'food') {
      const mergeText = `${results[index].nationality} - ${results[index].category}`;
      setTopText(mergeText);
    } else {
      const mergeText = `${results[index].alcoholicOrNot} - ${results[index].category}`;
      setTopText(mergeText);
    }
  }, []);

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

  console.log(results[index].tags);

  return (
    <div className="done-button-item">
      <button id="done-button" type="button" onClick={ handleClickRecipe }>
        <img
          className="card-image-done"
          src={ results[index].image }
          alt="card-recipes-done"
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <div className="done-details" key={ index }>
        <div className="testando">
          <p data-testid={ `${index}-horizontal-top-text` }>
            {topText}
          </p>
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
        </div>
        <button id="done-button" type="button" onClick={ handleClickRecipe }>
          <p data-testid={ `${index}-horizontal-name` }>
            { results[index].name }
          </p>
        </button>
        <div>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { `Done in: ${results[index].doneDate} ` }
          </p>
        </div>
        {linkCopied && <p>Link copied!</p>}
        <div id="span" key="qualquer">
          { results[index].tags && results[index].tags.map((e, i) => (
            <span key={ i } data-testid={ `${index}-${e}-horizontal-tag` }>
              {`${e}   `}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

CardDoneRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default CardDoneRecipes;
