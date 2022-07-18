import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import setApiAction from '../redux/Actions';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = ({ dispatchSetApi }) => {
  const history = useHistory();
  const handleDrinkClick = () => {
    dispatchSetApi('cocktail');
    history.push('/drinks');
  };
  const handleMealClick = () => {
    dispatchSetApi('meal');
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

const mapDispatchToProps = (dispatch) => ({
  dispatchSetApi: (api) => dispatch(setApiAction(api)),
});

Footer.propTypes = {
  dispatchSetApi: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Footer);
