import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import setLocalType from '../0 - Services/Functions/setType';

function Recomendation({ index, name, img, results }) {
  const history = useHistory();
  const { pathname } = history.location;
  const typeForApi = setLocalType(pathname);
  console.log(typeForApi);

  const handleClickRecipe = () => {
    if (typeForApi !== 'meal') {
      history.push(`/foods/${results[index].idMeal}`);
    } else {
      history.push(`/drinks/${results[index].idDrink}`);
    }
  };
  return (
    <div className="recomedation-container" data-testid={ `${index}-recomendation-card` }>
      <button className="recomedation-btn" type="button" onClick={ handleClickRecipe }>
        <img
          className="recomedation-img"
          data-testid={ `${index}-card-img` }
          src={ img }
          alt="cardThumb"
        />
        <div className="recomedation-text">
          {typeForApi === 'meal'
            && <span>{results[index].strAlcoholic}</span>}
          {typeForApi === 'cocktail'
            && <span>{results[index].strTags}</span>}
          <p
            className="recomedation-name"
            data-testid={ `${index}-recomendation-title` }
          >
            {name}
          </p>

        </div>

      </button>
    </div>
  );
}

Recomendation.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Recomendation;
