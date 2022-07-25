import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';

function CardFavoriteRecipes({ index, results }) {
//   const history = useHistory();
  const [linkCopied, setLinkCopied] = useState(false);
  const [topText, setTopText] = useState('');

  useEffect(() => {
    const mergeText = `${results[index].nationality} - ${results[index].category}`;
    setTopText(mergeText);
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

  return (
    <div>
      <div key={ index }>
        <img
          className="card-image"
          src={ results[index].image }
          alt="foodImage"
          data-testid={ `${index}-horizontal-image` } // imagem do card de receita
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {topText}
        </p>
        <p data-testid={ `${index}-horizontal-name` }>
          {results[index].name}
        </p>
        <FavoriteButton
          id={ results[index].id }
          results={ results }
          type={ results[index].type }
          dataTest={ `${index}-horizontal-favorite-btn` }
        />
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
      </div>
    </div>
  );
}

CardFavoriteRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default CardFavoriteRecipes;
