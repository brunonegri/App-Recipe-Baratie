import React from 'react';
import PropTypes from 'prop-types';

function Recomendation({ index, name, img, datatest }) {
  return (
    <div className="card-container" data-testid={ datatest }>
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

Recomendation.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
};

export default Recomendation;
