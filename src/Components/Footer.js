import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();
  console.log(history);
  const handleDrinkClick = () => {
    history.push('/drinks');
  };
  const handleMealClick = () => {
    history.push('/foods');
  };

  return (
    <div className="footer-container" data-testid="footer">
      <button
        type="button"
        onClick={ handleDrinkClick }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />

      </button>
      <button
        type="button"
        onClick={ handleMealClick }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </div>
  );
};

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Footer;
