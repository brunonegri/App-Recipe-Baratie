import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
// import shareIcon from '../images/shareIcon.svg';
import shareDone from '../images/pirate/shareDone.png';
import FavoriteButton from './FavoriteButton';

function CardFavoriteRecipes({ index, results }) {
  const history = useHistory();
  const [linkCopied, setLinkCopied] = useState(false);
  // const [counter, setCounter] = useState(0);
  const [topText, setTopText] = useState('');

  useEffect(() => {
    if (results[index].type === 'food') {
      const mergeText = `${results[index].nationality} - ${results[index].category}`;
      setTopText(mergeText);
    } else {
      const mergeText = `${results[index].alcoholicOrNot}`;
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

  return (
    <div className="favoriteCard" key={ index }>
      <button className="img-fav" type="button" onClick={ handleClickRecipe }>

        <img
          className="card-image-favorite "
          src={ results[index].image }
          alt="foodImage"
          data-testid={ `${index}-horizontal-image` } // imagem do card de receita
        />
      </button>
      <div className="favname">
        <div className="test">
          <p className="toptext" data-testid={ `${index}-horizontal-top-text` }>
            {topText}
          </p>
          <button type="button" onClick={ handleClickRecipe }>
            <p className="name-card-favorite" data-testid={ `${index}-horizontal-name` }>
              {results[index].name}
            </p>
          </button>
        </div>
        <div className="share-container">
          <FavoriteButton
            id={ results[index].id }
            results={ results }
            type={ results[index].type }
            dataTest={ `${index}-horizontal-favorite-btn` }
          />

          <button
            type="button"
            onClick={ handleClickShare }
          >
            <img
              width="37px"
              src={ shareDone }
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
