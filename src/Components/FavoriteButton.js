import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { addFavLocalStorage,
  remFavLocalStorage } from '../0 - Services/LocalStorage/LocalStorage';

function FavoriteButton({ id, type, results }) {
  const [favorite, setFavorite] = useState(false);
  //   e === id && setFavorite(true)
  useEffect(() => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (getFavorite.length >= 1) {
      getFavorite.some((e) => e.id === id && setFavorite(true));
    }
  }, []);

  const handleClick = () => {
    if (favorite) {
      remFavLocalStorage(id);
    } else {
      addFavLocalStorage(type, results[0]);
    }
    setFavorite(!favorite);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="Icone de Favoritar"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default FavoriteButton;
