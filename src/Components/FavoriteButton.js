import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setCounterAction } from '../redux/Actions';
import { addFavLocalStorage,
  remFavLocalStorage } from '../0 - Services/LocalStorage/LocalStorage';

function FavoriteButton({ id, type, results, dataTest, dispatchCounter, counterValue }) {
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
      dispatchCounter(counterValue - 1);
    } else {
      addFavLocalStorage(type, results[0]);
      dispatchCounter(counterValue + 1);
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
          data-testid={ dataTest }
        />
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCounter: (counter) => dispatch(setCounterAction(counter)),
});

const mapStateToProps = (state) => ({
  counterValue: state.page.setCounter,
});

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dataTest: PropTypes.string.isRequired,
  dispatchCounter: PropTypes.func.isRequired,
  counterValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
