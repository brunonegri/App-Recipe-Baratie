import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import setPageAction from '../redux/Actions';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = ({ dispatchPageName }) => {
  const history = useHistory();
  const handleDrinkClick = () => {
    dispatchPageName('Drinks');
    history.push('/drinks');
  };
  const handleMealClick = () => {
    dispatchPageName('Foods');
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
  dispatchPageName: (pageName) => dispatch(setPageAction(pageName)),
});

Footer.propTypes = {
  dispatchPageName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Footer);
