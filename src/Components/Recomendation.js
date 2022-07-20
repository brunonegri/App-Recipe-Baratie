import React from 'react';
import PropTypes from 'prop-types';

function Recomendation({ index, name, img }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <p
        className="recomedation-name"
        data-testid={ `${index}-recomendation-title` }
      >
        {name}
      </p>
      <img
        className="recomedation-img"
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
};

export default Recomendation;
