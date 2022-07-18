import React from 'react';
import PropTypes from 'prop-types';

function Recipe({ index, name, img }) {
  return (
    <div className="card-container" data-testid={ `${index}-recipe-card` }>
      <p className="card-name" data-testid={ `${index}-card-name` }>{name}</p>
      <img
        className="card-image"
        data-testid={ `${index}-card-img` }
        src={ img }
        alt="cardThumb"
      />
    </div>
  );
}

Recipe.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Recipe;
