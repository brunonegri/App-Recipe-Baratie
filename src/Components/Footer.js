import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setApiAction, setPageAction } from '../redux/Actions';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import drink from '../images/pirate/drink.png';
import food from '../images/pirate/food.png';

const Footer = ({ dispatchSetApi, dispatchPageName }) => {
  const history = useHistory();
  const handleDrinkClick = () => {
    dispatchSetApi('cocktail');
    dispatchPageName('Drinks');
    history.push('/drinks');
  };
  const handleMealClick = () => {
    dispatchSetApi('meal');
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
          src={ drink }
          alt="drinkIcon"
        />

      </button>
      <button
        type="button"
        onClick={ handleMealClick }
      >
        <img
          data-testid="food-bottom-btn"
          src={ food }
          alt="mealIcon"
        />
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetApi: (api) => dispatch(setApiAction(api)),
  dispatchPageName: (pageName) => dispatch(setPageAction(pageName)),
});

Footer.propTypes = {
  dispatchSetApi: PropTypes.func.isRequired,
  dispatchPageName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Footer);
